# models/custom_model.py

def get_custom_result(selected_item, inputs):
    user_text = inputs.get("userText", "")

    # === (1) 예측 점수 (지금은 더미값, 모델 연결 전까지는 고정) ===
    predicted = {
        "noise": 9,
        "safety": 8,
        "rent": 6,
        "traffic": 7,
        "population": 5,
        "amenities": 8,
        "facility": 7,
        "cctv": 9
    }

    # === (2) 예시 DB (실제로는 CSV → pandas 읽어서 써도 됨) ===
    db = [
        {
            "dong": "성수동",
            "score": {
                "noise": 7,
                "safety": 8,
                "rent": 6,
                "traffic": 8,
                "population": 5,
                "amenities": 6,
                "facility": 6,
                "cctv": 8
            }
        },
        {
            "dong": "망원동",
            "score": {
                "noise": 8,
                "safety": 7,
                "rent": 7,
                "traffic": 7,
                "population": 6,
                "amenities": 7,
                "facility": 5,
                "cctv": 7
            }
        },
        {
            "dong": "연남동",
            "score": {
                "noise": 9,
                "safety": 9,
                "rent": 5,
                "traffic": 6,
                "population": 5,
                "amenities": 8,
                "facility": 7,
                "cctv": 8
            }
        }
    ]

    # === (3) 오차 계산 (선택 항목에 가중치 적용) ===
    def compute_diff(pred, actual, selected):
        total = 0
        for k in selected:
            if k in pred and k in actual:
                total += abs(pred[k] - actual[k])
        return total


    # === (4) 전체 동 정렬해서 상위 3개 추천 ===
    sorted_result = sorted(
        db,
        key=lambda row: compute_diff(predicted, row["score"], selected_item)
    )

    return {
    "selectedItem": selected_item,
    "userText": user_text,
    "recommendations": sorted_result[:3]
    }
