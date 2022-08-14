from flask import Flask, jsonify, request
from flask_cors import CORS
if __name__ == '__main__':
    from student_api import StudentQuery
else:
    from .student_api import StudentQuery

app = Flask(__name__)
CORS(app)


@app.route('/students', methods=['GET'])
def get_students():
    student_query = StudentQuery()
    return jsonify(student_query.get_all())


@app.route('/student/<uuid>', methods=['GET'])
def get_student(uuid):
    student_query = StudentQuery()
    return jsonify(student_query.get_by_uuid(uuid))


@app.route('/student', methods=['POST'])
def create_student():
    student_data = request.json
    student_query = StudentQuery()
    uuid = student_query.create_student(student_data)
    return jsonify({'uuid': uuid})


@app.route('/student/<uuid>', methods=['DELETE'])
def delete_student(uuid):
    student_query = StudentQuery()
    result = student_query.delete_student(uuid)
    return jsonify({'success': result})


@app.route('/student/<uuid>', methods=['PUT'])
def update_student(uuid):
    student_data = request.json
    student_query = StudentQuery()
    result = student_query.update_student(uuid, student_data)
    return jsonify({'success': result})


if __name__ == "__main__":
    app.run(debug=True)
