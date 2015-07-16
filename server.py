# System imports
import subprocess
import time
from os import path

import numpy as np
from flask.ext.cors import CORS
from flask import *
from werkzeug import secure_filename
from flask_extensions import *



# Local predicition modules
# sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'prediction')) #find modules in parent_folder/predictions

static_assets_path = path.join(path.dirname(__file__), "dist")
app = Flask(__name__, static_folder=static_assets_path)
CORS(app)


# ----- Routes ----------

@app.route("/", defaults={"fall_through": ""})
@app.route("/<path:fall_through>")
def index(fall_through):
    if fall_through:
        return redirect(url_for("index"))
    else:
        return app.send_static_file("index.html")


@app.route("/dist/<path:asset_path>")
def send_static(asset_path):
    return send_from_directory(static_assets_path, asset_path)


@app.route("/videos/<path:video_path>")
def send_video(video_path):
    return send_file_partial(path.join(app.config["UPLOAD_FOLDER"], video_path))


@app.route("/api/upload", methods=["POST"])
def uploadVideo():
    def isAllowed(filename):
        return len(filter(lambda ext: ext in filename, ["avi", "mpg", "mpeg", "mkv", "webm", "mp4", "mov"])) > 0

    file = request.files.getlist("video")[0]

    if file and isAllowed(file.filename):
        filename = secure_filename(file.filename)
        file_path = path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        response = jsonify(get_prediction(file_path))
    else:
        response = bad_request("Invalid file")

    return response


@app.route("/api/example/<int:example_id>")
def use_example(example_id):
    if example_id <= 3:
        filename = "video%s.webm" % example_id
        file_path = path.join(app.config["UPLOAD_FOLDER"], "examples", filename)
        response = jsonify(get_prediction(file_path))
    else:
        response = bad_request("Invalid Example")

    return response


def bad_request(reason):
    response = jsonify({"error": reason})
    response.status_code = 400
    return response


# -------- Prediction & Features --------
def get_prediction(file_path):
    # predictions = external_script.predict(file_path)
    predictions = np.ones((100, 10))

    file_path = file_path + "?cachebuster=%s" % time.time()
    result = {
        "video": {
            "url": "%s" % file_path,
            "framerate": 25
        },
        "frames": []
    }

    for index, row in enumerate(predictions):

        pred_per_label = []

        five_best = np.argpartition(row, -5)[-5:]
        for i in five_best:
            pred_per_label.append({"label": i, "prob": row[i]})

        new_frame = {
            "frameNumber": index,
            "predictions": pred_per_label
        }

        result["frames"].append(new_frame)

    return result


if __name__ == "__main__":
    # Start the server
    app.config.update(
        DEBUG=True,
        SECRET_KEY="asassdfs",
        CORS_HEADERS="Content-Type",
        UPLOAD_FOLDER="videos"
    )

    # Make sure all frontend assets are compiled
    subprocess.Popen("webpack")

    # Start the Flask app
    app.run(port=9000)
