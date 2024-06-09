import random, cv2, json, os

# File paths to the folders containing the original images for both the fake and real classes
fakeOriginalDatasetPath = './original_dataset/fake/back/'
realOriginalDatasetPath = './original_dataset/real/back/'

# File paths to the folders that will have the augmented images outputted to them
fakeAugmentedDatasetPath = './augmented_dataset/fake/'
realAugmentedDatasetPath = './augmented_dataset/real/'

# File path for where the augmentation data JSON file is outputted
augmentationDataJSONOutputPath = './augmented_dataset.json'

augmentationData = {}

def augmentImage(datasetFilePath, imageName, newImageName):
    image = cv2.imread(os.path.join(datasetFilePath, imageName))
    augmentationsDoneToImage = {}

    # At minimum 1 augmentation per an image, at most 2
    numberOfAugmentations = random.randrange(1,3,1)

    # Track previous augmentation type to prevent having 2 of the same augmentation
    previousAugmentationType = None

    for _ in range(numberOfAugmentations):
        augmentationType = random.randrange(1,5,1)

        while previousAugmentationType is not None and augmentationType == previousAugmentationType:
            augmentationType = random.randrange(1,5,1)

        previousAugmentationType = augmentationType

        match augmentationType:
            case 1:
                # Rotate using a randomized angle between -15 degrees and 15 degrees
                rotationAngle = random.randrange(-8,9,1)
                rows, columns = image.shape[:2]

                imageDimensionsTuple = (columns, rows)
                centerOfImageTuple = (columns/2, rows/2)

                rotationMatrix = cv2.getRotationMatrix2D(centerOfImageTuple, rotationAngle, 1)
                image = cv2.warpAffine(image, rotationMatrix, imageDimensionsTuple)
                augmentationsDoneToImage["rotate"] = {"rotationAngle": rotationAngle}
            case 2:
                # Flip using a randomized flip code of 0 or 1 (0 = horizontal flipping, 1 = vertical flipping)
                flipCode = random.randrange(0,2,1)
                image = cv2.flip(image, flipCode)
                augmentationsDoneToImage["flip"] = {"flipCode": flipCode}
            case 3:
                # Brightness/Contrast with a alpha ranging between 0 and 5 stepping by 0.5 increments and a beta ranging between 0 and 1.5 stepping by 0.1 increments
                alpha, beta = round(random.uniform(0,5)/0.5)*0.5, round(random.uniform(0.5,1.5)/0.1) * 0.1
                image = cv2.convertScaleAbs(image, alpha, beta)
                augmentationsDoneToImage["brightness_contrast"] = {"alpha": alpha, "beta": beta}
            case 4:
                # Blur with a kernel size ranging between 3 and 5 by 2 increments (kernel sizes can only be odd numbers starting at minimum 3)
                kernelSize = random.randrange(3,6,2);
                kernelSizeTuple = (kernelSize, kernelSize)
                image = cv2.GaussianBlur(image, kernelSizeTuple, 0)
                augmentationsDoneToImage["blur"] = {"kernelSize": kernelSize}

    augmentationData[newImageName] = {
        "numberOfAugmentations" : numberOfAugmentations,
        "augmentationsDoneToImage": augmentationsDoneToImage
    }
    
    return image

def augmentDataset():
    fakeOriginalDataset, realOriginalDataset = os.listdir(fakeOriginalDatasetPath), os.listdir(realOriginalDatasetPath)
    fakeOriginalDatasetSize, realOriginalDatasetSize = len(fakeOriginalDataset), len(realOriginalDataset)

    if fakeOriginalDatasetSize == realOriginalDatasetSize:
        print("Dataset is evenly distributed and no augmentation is needed")
        return

    if fakeOriginalDatasetSize > realOriginalDatasetSize:
        # Preform augmentations on realOriginalDataset to even the distribution
        imagesAugmentedCounter = realOriginalDatasetSize
        while imagesAugmentedCounter < fakeOriginalDatasetSize:
            for imageName in realOriginalDataset:
                if imagesAugmentedCounter == fakeOriginalDatasetSize:
                    break
                
                newImageName = str(imagesAugmentedCounter + 1) + ".png"
                augmentedImage = augmentImage(realOriginalDatasetPath, imageName, newImageName)
                cv2.imwrite(os.path.join(realAugmentedDatasetPath, newImageName), augmentedImage)
                imagesAugmentedCounter += 1
    else:
        # Preform augmentations on fakeOriginalDataset to even the distribution
        imagesAugmentedCounter = fakeOriginalDatasetSize
        while imagesAugmentedCounter < realOriginalDatasetSize:
            for imageName in fakeOriginalDataset:
                if imagesAugmentedCounter == realOriginalDatasetSize:
                    break

                newImageName = str(imagesAugmentedCounter + 1) + ".png"
                augmentedImage = augmentImage(fakeOriginalDatasetPath, imageName, newImageName)
                cv2.imwrite(os.path.join(fakeAugmentedDatasetPath, newImageName), augmentedImage)
                imagesAugmentedCounter += 1

    with open(augmentationDataJSONOutputPath, "w") as outputFile:
        json.dump(augmentationData, outputFile)

    print("Done :)")
    
if __name__ == "__main__":
    augmentDataset()