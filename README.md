# BeyondMD Assessment

1. Make a simple page using HTML, CSS, and/or javascript that displays “Hello BeyondMD!“, and then dockerize it. It must run using docker-compose.
2. Make a simple page using React that says “Hello BeyondMD!”, displays your resume pdf, and displays data from a free API using MUI.
3. Make a basic CRUD Django-Postgres App that uses a free API in some way. 
Bonus points if you dockerize projects 2 or 3, extra bonus points if you combine projects 2 and 3 and dockerize the combination.

## Features

1. Create a single record of an office visit by selecting from an extensive dropdown list of symptoms.
2. Utilize the API Medic to fetch possible diagnoses based on symptoms.
3. Enable the creation of multiple records by uploading a CSV file.
4. Each record includes the ability to view additional details, edit the record, and delete the record.

## Installation
To get started with this project, follow these steps:

1. Clone the repository:
   git clone https://github.com/hnrykm/beyondmd.git
   cd beyondmd
2. Create a Docker volume for the database 'docker volume create beyondmd-data'
3. Build the Docker images 'docker compose build'
4. Build the Docker containers 'docker compose up'
5. Start at http://localhost:8080 and click the next arrow to be taken to the React app

## Design

Wireframe and screenshots are available within the "design" directory in this repository.

## About ApiMedic's Symptom Checker API

ApiMedic offers a medical symptom checker primarily designed for patients. It analyzes entered symptoms and provides information on possible diseases. The tool directs patients to more medical information and helps them find the right doctor for further clarifications. The symptom checker can be integrated via a flexible API (Application Programming Interface), offering its functionalities for use in various programs.
