import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class NLPComplaintPipeline:
    """
    Lightweight pipeline for classifying complaints:
    - Step 1: Validity (valid/invalid)
    - Step 2: Category (cutting/dying/pollution/other)

    Loads pretrained models and their weights. Does NOT save anything automatically.
    """

    def __init__(self, validity_model_path, category_model_path, device=None):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

        # Load Validity model + tokenizer
        self.tokenizer_validity = AutoTokenizer.from_pretrained(validity_model_path)
        self.model_validity = AutoModelForSequenceClassification.from_pretrained(validity_model_path)
        self.model_validity.to(self.device)
        self.model_validity.eval()

        # Load Category model + tokenizer
        self.tokenizer_category = AutoTokenizer.from_pretrained(category_model_path)
        self.model_category = AutoModelForSequenceClassification.from_pretrained(category_model_path)
        self.model_category.to(self.device)
        self.model_category.eval()

        self.categories = ["cutting", "dying", "pollution", "other"]

    def predict_validity(self, text):
        """Predicts if complaint is valid or invalid"""
        inputs = self.tokenizer_validity(
            text, return_tensors="pt", truncation=True, padding=True, max_length=128
        )
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            logits = self.model_validity(**inputs).logits
            pred = torch.argmax(torch.sigmoid(logits), dim=1).item()
        return "valid" if pred == 1 else "invalid"

    def predict_category(self, text):
        """Predicts category if complaint is valid"""
        inputs = self.tokenizer_category(
            text, return_tensors="pt", truncation=True, padding=True, max_length=128
        )
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            logits = self.model_category(**inputs).logits
            pred = torch.argmax(logits, dim=1).item()
        return self.categories[pred]

    def classify_complaint(self, text):
        """Unified function to classify validity + category"""
        validity = self.predict_validity(text)
        if validity == "invalid":
            return {"validity": "invalid", "category": "N/A"}
        category = self.predict_category(text)
        return {"validity": "valid", "category": category}

    def load_weights(self, validity_weights_path, category_weights_path):
        """Load saved model weights separately"""
        self.model_validity.load_state_dict(
            torch.load(validity_weights_path, map_location=self.device)
        )
        self.model_category.load_state_dict(
            torch.load(category_weights_path, map_location=self.device)
        )
