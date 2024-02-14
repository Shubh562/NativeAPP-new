/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);




from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.errors import InvalidId

app = Flask(__name__)

# Setup MongoDB connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)

@app.route('/data', methods=['GET'])
def get_data():
    data = mongo.db.my_collection.find()
    result = [{item: data[item] for item in data if item != '_id'} for data in data]
    return jsonify(result)

@app.route('/data', methods=['POST'])
def add_data():
    data = request.json
    mongo.db.my_collection.insert_one(data)
    return jsonify({'msg': 'Data added successfully'}), 201

@app.route('/data/<id>', methods=['PUT'])
def update_data(id):
    try:
        updates = request.json
        mongo.db.my_collection.update_one({'_id': ObjectId(id)}, {'$set': updates})
        return jsonify({'msg': 'Data updated successfully'})
    except InvalidId:
        return jsonify({'error': 'Invalid ID format'}), 400

@app.route('/data/<id>', methods=['DELETE'])
def delete_data(id):
    try:
        mongo.db.my_collection.delete_one({'_id': ObjectId(id)})
        return jsonify({'msg': 'Data deleted successfully'}), 204
    except InvalidId:
        return jsonify({'error': 'Invalid ID format'}), 400

@app.route('/data/release/<release_id>', methods=['GET'])
def get_data_by_release_id(release_id):
    data = mongo.db.my_collection.find_one({'release_id': release_id})
    if data:
        result = {item: data[item] for item in data if item != '_id'}
        return jsonify(result)
    else:
        return jsonify({'error': 'Data not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

