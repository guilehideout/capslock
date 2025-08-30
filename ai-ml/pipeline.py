# complaint_pipeline.py

import re

class ComplaintClassifier:
    def __init__(self, clf_validity, vectorizer_validity, clf_category, vectorizer_category):
        self.clf_validity = clf_validity
        self.vectorizer_validity = vectorizer_validity
        self.clf_category = clf_category
        self.vectorizer_category = vectorizer_category
        self.bad_samples = ["asdfghjkl", "hello world", "test entry", "spam", "gibberish"]

    def nlp_semantic_check(self, text):
        alpha_text = re.sub(r'[^a-zA-Z\s]', '', text)
        words = alpha_text.split()
        if len(words) < 2:
            return False
        word_counts = {w: words.count(w) for w in set(words)}
        if any(count > 3 for count in word_counts.values()):
            return False
        alpha_ratio = sum(c.isalpha() for c in text) / max(1, len(text))
        if alpha_ratio < 0.5:
            return False
        return True

    def quick_validity_check(self, text):
        if len(text.split()) < 3:
            return "invalid"
        words = text.lower().split()
        if len(set(words)) == 1:
            return "invalid"
        if any(bad in text.lower() for bad in self.bad_samples):
            return "invalid"
        if not self.nlp_semantic_check(text):
            return "invalid"
        return self.clf_validity.predict(self.vectorizer_validity.transform([text]))[0]

    #  Text input-string
    def classify_complaint(self, text):
        validity = self.quick_validity_check(text)
        if validity == "invalid":
            return {"validity": "invalid", "category": "N/A"}
        
        category_features = self.vectorizer_category.transform([text])
        category_pred = self.clf_category.predict(category_features)[0]

        if category_pred == "cutting":
            category_pred = "pollution"
        elif category_pred == "pollution":
            category_pred = "cutting"

        return {"validity": "valid", "category": category_pred}
