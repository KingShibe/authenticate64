# authenticate64 Dataset Preprocessing

## Important Notes

This Python file was designed to only do augmentation on a dataset if there is an imbalance between the amount of images the classes (in this case real or fake) contain. This is done in an effort to deter overfitting or underfitting by the CNN model during training. Another design aspect is to have as much randomness as possible from the number of augmentations done per a photo, to the parameters chosen for the augmentations. The decisions to cap the augmentations to at most 2 per an image and use the augmentation paramater ranges defined within the comments of the file were opinion based decisions to maintain realism within the dataset.

## Installation (Windows)

```bash
git clone https://github.com/KingShibe/authenticate64.git
cd authenticate64/dataset_preprocessing
py -3 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Commands (Windows)

To run the preprocessing Python file (will vary based on system type):
```bash
py dataset_preprocessing.py
```