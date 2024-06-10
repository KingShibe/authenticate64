import torch
from torchvision.models import resnet18, ResNet18_Weights
from torchvision import transforms, datasets
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# Paths to datasets
trainingDatasetPath = './training_dataset'
validationDatasetPath = './validation_dataset'

def setupModel(device, numOfClasses):
    model = resnet18(weights=ResNet18_Weights.DEFAULT)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, numOfClasses)
    model = model.to(device)

    # Freeze all pretrained layers on the model
    for param in model.parameters():
        param.requires_grad = False
    
    # Unfreeze fully connected layer for training
    for param in model.fc.parameters():
        param.requires_grad = True
    
    return model

def processData(batchSize):
    preprocessImage = transforms.Compose([
        # Resizing to 224 x 224 since the Resnet model is expecting that at minimum
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        # Using ImageNet's mean and std
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    trainingDataset = datasets.ImageFolder(root=trainingDatasetPath, transform=preprocessImage)
    validationDataset = datasets.ImageFolder(root=validationDatasetPath, transform=preprocessImage)

    trainingLoader = DataLoader(trainingDataset, batch_size=batchSize, shuffle=True)
    validationLoader = DataLoader(validationDataset, batch_size=batchSize, shuffle=False)
    
    return trainingLoader, validationLoader

def trainModel(model, device, trainingLoader, validationLoader, numOfEpochs, patience, learningRate, momentum):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=learningRate, momentum=momentum)
    
    epochs, trainingLosses, validationLosses, trainingAccuracies, validationAccuracies = [], [], [], [], []

    bestValidationLoss = float('inf')
    numOfNoImproveEpochs = 0

    for epoch in range(numOfEpochs):
        model.train()

        runningCorrect = 0
        runningTotal = 0
        runningLoss = 0.0 

        for inputBatch, labels in trainingLoader:
            inputBatch, labels = inputBatch.to(device), labels.to(device)

            optimizer.zero_grad()

            outputs = model(inputBatch)
            _, classPredictions = torch.max(outputs, 1)
            loss = criterion(outputs, labels)

            loss.backward()
            optimizer.step()

            runningLoss += loss.item() * inputBatch.size(0)
            runningTotal += labels.size(0)
            runningCorrect += (classPredictions == labels).sum().item()
        
        # Calculate metrics
        trainingLoss = runningLoss / len(trainingLoader.dataset)
        trainingAccuracy = runningCorrect/runningTotal
        validationLoss, validationAccuracy = validateModelOneEpoch(model, device, validationLoader, criterion)

        # Append each metric to their respective arrays for plotting
        epochs.append(epoch)
        trainingLosses.append(trainingLoss)
        validationLosses.append(validationLoss)
        trainingAccuracies.append(trainingAccuracy)
        validationAccuracies.append(validationAccuracy)

        print(f"Epoch {epoch+1} | Training Loss: {round(trainingLoss, 2)} | Validation Loss: {round(validationLoss, 2)} | Training Accuracy: {round(100 * trainingAccuracy, 2)}% | Validation Accuracy: {round(100 * validationAccuracy, 2)}%")

        # Early Stopping
        if validationLoss < bestValidationLoss:
            bestValidationLoss = validationLoss
            numOfNoImproveEpochs = 0
            torch.save(model.state_dict(), 'bestN64Model.pt')
        else:
            numOfNoImproveEpochs += 1
            if numOfNoImproveEpochs >= patience:
                print(f"Early Stopping At Epoch {epoch+1}")
                break

    plotLossCurve(epochs, trainingLosses, validationLosses)
    plotAccuracyCurve(epochs, trainingAccuracies, validationAccuracies)

def validateModelOneEpoch(model, device, validationLoader, criterion):
    runningCorrect = 0
    runningTotal = 0
    runningLoss = 0.0 

    model.eval()
    with torch.no_grad():
        for inputBatch, labels in validationLoader:
            inputBatch, labels = inputBatch.to(device), labels.to(device)
            outputs = model(inputBatch)
            _, classPredictions = torch.max(outputs, 1)
            loss = criterion(outputs, labels)

            runningLoss += loss.item() * inputBatch.size(0)
            runningTotal += labels.size(0)
            runningCorrect += (classPredictions == labels).sum().item()

    validationLoss = runningLoss / len(validationLoader.dataset)
    validationAccuracy = runningCorrect/runningTotal

    return validationLoss, validationAccuracy

def plotLossCurve(epochs, trainingLosses, validationLosses):
    plt.title("Loss Curve")
    plt.plot(epochs, trainingLosses, label='Training')
    plt.plot(epochs, validationLosses, label='Validation')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.show()

def plotAccuracyCurve(epochs, trainingAccuracies, validationAccuracies):
    plt.title("Accuracy Curve")
    plt.plot(epochs, trainingAccuracies, label='Training')
    plt.plot(epochs, validationAccuracies, label='Validation')
    plt.xlabel('Epochs')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.show()

if __name__ == "__main__":
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = setupModel(device, numOfClasses=2)
    trainingLoader, validationLoader = processData(batchSize=64)
    trainModel(model, device, trainingLoader, validationLoader, numOfEpochs=100, patience=5, learningRate=0.001, momentum=0.9)