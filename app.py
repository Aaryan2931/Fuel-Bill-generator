from pathlib import Path

from flask import Flask, abort, render_template, send_from_directory

app = Flask(__name__, static_folder=None)
PUBLIC_DIR = Path(__file__).resolve().parent / "public"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/<path:asset_path>")
def public_assets(asset_path):
    asset = (PUBLIC_DIR / asset_path).resolve()

    if not asset.is_relative_to(PUBLIC_DIR.resolve()) or not asset.is_file():
        abort(404)

    return send_from_directory(PUBLIC_DIR, asset_path)


if __name__ == "__main__":
    app.run(debug=True)
