import csv
import io
from flask import Flask, jsonify
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app)

s3 = boto3.client("s3")

BUCKET_NAME = "pmx-ml-dev"
OBJECT_KEY = "clustering/input/profitmatrix_model.csv"


@app.get("/api/test-profitmatrix-file")
def test_profitmatrix_file():
    signed_url = s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": BUCKET_NAME,
            "Key": OBJECT_KEY
        },
        ExpiresIn=900
    )

    return jsonify({
        "bucket": BUCKET_NAME,
        "key": OBJECT_KEY,
        "url": signed_url
    })


@app.get("/api/test-profitmatrix-preview")
def test_profitmatrix_preview():
    response = s3.get_object(
        Bucket=BUCKET_NAME,
        Key=OBJECT_KEY
    )

    csv_text = response["Body"].read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(csv_text))

    rows = []
    for i, row in enumerate(reader):
        rows.append(row)
        if i >= 4:
            break

    return jsonify({
        "bucket": BUCKET_NAME,
        "key": OBJECT_KEY,
        "sample_rows": rows
    })


@app.get("/api/profitmatrix-data")
def get_profitmatrix_data():
    response = s3.get_object(
        Bucket=BUCKET_NAME,
        Key=OBJECT_KEY
    )

    csv_text = response["Body"].read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = list(reader)

    return jsonify(rows)


if __name__ == "__main__":
    app.run(debug=True)