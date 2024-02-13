This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.\









Step 1: Install MongoDB
Ensure MongoDB is installed and running on your local machine. You can download MongoDB from the official website and follow the installation instructions for your operating system.

Step 2: Create a New Python Project
Create a project directory:

bash
Copy code
mkdir myproject
cd myproject
Create and activate a virtual environment (optional but recommended):

bash
Copy code
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install required packages:

bash
Copy code
pip install Flask Flask-PyMongo
Step 3: Writing the Application
Create a new file named app.py and open it in your text editor. Below is a simple application that connects to MongoDB and defines basic CRUD (Create, Read, Update, Delete) operations through a REST API.

python
Copy code
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)

# Setup MongoDB connection
# 'mydatabase' is the name of your database
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)

@app.route('/data', methods=['GET'])
def get_data():
    data = mongo.db.my_collection.find()  # 'my_collection' is your collection name
    result = [{item: data[item] for item in data if item != '_id'} for data in data]
    return jsonify(result)

@app.route('/data', methods=['POST'])
def add_data():
    data = request.json
    mongo.db.my_collection.insert_one(data)
    return jsonify({'msg': 'Data added successfully'}), 201

@app.route('/data/<id>', methods=['PUT'])
def update_data(id):
    updates = request.json
    mongo.db.my_collection.update_one({'_id': id}, {'$set': updates})
    return jsonify({'msg': 'Data updated successfully'})

@app.route('/data/<id>', methods=['DELETE'])
def delete_data(id):
    mongo.db.my_collection.delete_one({'_id': id})
    return jsonify({'msg': 'Data deleted successfully'}), 204

if __name__ == '__main__':
    app.run(debug=True)
Step 4: Run the Application
Execute the following command in your terminal to start the Flask application:

bash
Copy code
python app.py
Your Flask application will start, and you can access your API at http://localhost:5000/.
