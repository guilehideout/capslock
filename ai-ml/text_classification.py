from pipeline import NLPComplaintPipeline
import torch
import sys


# Initialize pipeline
pipeline = NLPComplaintPipeline(
    validity_model_path="./models/nlp_validity",
    category_model_path="./models/nlp_category"
)

# Load previously saved weights
pipeline.model_validity.load_state_dict(torch.load("models/validity_weights.pth", map_location=pipeline.device))
pipeline.model_category.load_state_dict(torch.load("models/category_weights.pth", map_location=pipeline.device))

# # Example usage
# text = ''
# while text.lower() != "quit":
text = " ".join(sys.argv[1:])
result = pipeline.classify_complaint(text)
print(result)

# pass text in CLI like "python text_classification.py they are cutting a mangrove"
