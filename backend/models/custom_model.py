# models/custom_model.py
def get_custom_result(selected_item, inputs):
    total = sum(int(v) for v in inputs.values() if str(v).isdigit())
    return {
        "message": "결과 잘 나옴!",
        "selectedItem": selected_item,
        "inputCount": len(inputs),
        "totalScore": total
    }