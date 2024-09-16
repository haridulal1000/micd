# MICD-WEBAPP

This MICD-WEBAPP is setup for building scalable, high-performance webapp with React and Redux.This seteup includes state management with Redux, routing with React Router.

## Table of contents

- [Preferred Version](#preferred_versions)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Preferred_versions

```js
    node: v16.15.0
    yarn: 1.22.19
```

## Installation

1. Clone the repository:

   ```js
   git clone https://rohitgrg@bitbucket.org/terahs/micd-webapp.git
   ```

2. Install the dependencies:

   ```js
   cd app
   yarn
   ```

3. Start the development server:

   ```js
   yarn dev
   ```

4. Run tests

   ```js
   yarn test
   ```

## Usage

To use the project, open your web browser and go to http://localhost:3000.

## Features

### Folder-structure

This structure was created to handle large code base and scale accordingly.

    -public
    -src
    |-app
        -core
            |-adapters
                -redux
                    |-actions
                    |-reducers
                    |-store
            |-domain
                |-entities
                |-interfaces
            |-infrastructure
                |-axios
                |-routes
                |-services
            |-utilities
        |-presentation
            |-modules
                |-auth
                |-form
    |-resources
        |-images
    |-scss
    |-tests

### Utility classes

**Validators**: A sample validators class is provided inside the utilities class which can be used for validation of commonly used input types

**Storage** : A sample utility component which has multiple functions to store the information to browser storage, it can be customised to fit your needs.

### Interceptors

**Token interceptor** : Token interceptor is used in axios -> index.ts file which will intercept the request and add the token if it is available in our storage.

**Error Interceptor** : Error interceptor is already implemented in the axios -> index.ts file which will intercept the response and make the application function accordingly

### Login page

A sample login page is also provided with this project setup to help you get started.

## Build scripts

### production

`yarn build:production `

### staging

`yarn build:staging `

### development

`yarn build:development `
