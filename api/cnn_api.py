from flask import Flask, request, jsonify
from flask_cors import CORS
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
from PIL import Image
from io import BytesIO
import torch
from torchvision.models import resnet18, ResNet18_Weights
from torchvision import transforms
import torch.nn.functional as nnf
import torch.nn as nn

# Set to True if you are testing locally
testing = True

app = Flask(__name__)
if testing == True: CORS(app) 

# limiter = Limiter(
#     key_func=lambda: request.headers.get('X-Forwarded-For'),
#     app=app,
#     default_limits=["20 per day", "5 per hour"],
#     storage_uri="memory://",
# )

cnnModelPath = './n64_model1.pth'
model = resnet18(weights=ResNet18_Weights.DEFAULT)

# Testing replacing the last fully connected layer
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)
# End test code

model.load_state_dict(torch.load(cnnModelPath))
model.eval()

@app.route("/verify", methods=['POST'])
def verify():
    if 'image' not in request.files:
        return jsonify({"error": "Invalid Request Paylod"}), 415

    recievedImageFile = request.files['image']

    if recievedImageFile.content_type != 'image/png' and recievedImageFile.content_type != 'image/jpeg':
        return jsonify({"error": "Invalid Image Type"}), 415
    
    recievedImageStream = BytesIO(recievedImageFile.read())
    receivedImage = Image.open(recievedImageStream).convert('RGB')

    preprocessImage = transforms.Compose([
        # Resizing to 224 x 224 since the Resnet model is expecting that at minimum
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        # Using ImageNet's mean and std
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    receivedImageTensor = preprocessImage(receivedImage)
    modelInputBatch = receivedImageTensor.unsqueeze(0)

    with torch.no_grad():
        modelOutput = model(modelInputBatch)
        classProbabilities = nnf.softmax(modelOutput, dim=1)
        _, predictedClassIndex = torch.max(classProbabilities, 1)
        isReal = True if predictedClassIndex == 1 else False
        predictedClassProbability = round(classProbabilities[0][predictedClassIndex].item()*100,1)

        # print(isReal, predictedClassProbability)

        if isReal == True:
            return jsonify({"isReal": True, "confidence": predictedClassProbability}), 200
        else:
            return jsonify({"isReal": False, "confidence": predictedClassProbability}), 200

if __name__ == "__main__":
    app.run(port=5050) if testing == True else app.run(host='0.0.0.0')
