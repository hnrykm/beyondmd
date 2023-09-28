## Wednesday, September 20, 2023

Today, I worked on...
    - Understanding the three prompts, making notes, and writing down stretch goals
    - Beginning researching and reading documentation for "react-pdf" and Material UI
    - Exploring free medical API service options
    - Starting GitHub repository, installed React.js and Django, and directory structure
    - Creating Dockerfiles for Django and PostgreSQL
    - Creating docker-compose.yml for react, django, postgres, and pg-admin

Today, I overcame these struggles...
    - Getting React Docker image built and running. I added a "run.sh" file with commands to install and start npm to fix the exiting Docker container with Error 127.
    - Getting Django Docker image built and running. I reconfigured the directory structure to remove errors, added psycopg2 dependency to requirements.txt, and changed default SQLite database settings to PostgreSQL.
    - Getting the pg-admin to function with the correct username/password. I used the same "pg-admin" name for the volume on another project so I renamed it "pg-admin-bmd".

Today's blockers are...
    - Django Docker container is running with error: Connection refused Is the server running on host "localhost" (::1) and accepting TCP/IP connections on port 5432.

Notes:
    For past bootcamp projects, I've used React/Django with SQLite and though we learned the basics of Dockerfiles, Docker commands, and docker-compose. It was a new experience to create the files, commands, and docker-compose.yml file. Gained more familiarity and everything is running but the Django-PostgreSQL isn't fully configured/functional at the moment. Lots of ideas floating around for how I can demonstrate my ability to go over and beyond. 


## Thursday, September 12, 2023

Today, I worked on...
    - Creating the quick web server using Nginx on docker-compose.yml
    - Creating "static" directory and subdirectories
    - Designing the static page to include CSS animation and getElementbyId()
    - Researching and deciding on the third-party API to use for this project: ApiMedic
    - Testing API calls through ApiMedic Sandbox to narrow down API requests to GET symptoms and GET diagnosis using the symptom ID, age, and gender
    - Discovering UI elements such as typography (typeface is Google Font: Lato) and color palette currently being used in the logo and website.

Today, I overcame these struggles...
    - Understanding what Nginx is and how/why to create server. I read through Nginx documentation and other searching to find the necessary parts for docker-compose.yml
    - Wanting to demonstrate understanding of HTML, CSS, and JavaScript in a simple, static webpage. Came up with a simple design to incorporate CSS animation and Vanilla JS.

Today's blockers are...
    - None

Notes:
    Today wasn't as coding intensive as it was brainstorming a design that is relevant to the company without adding unnecessary bells and whistles for the sake of looking cool or making it into some type of game. The plan for the static webpage is mostly finalized and the React project (prompts 2 and 3) is coming together nicely. Thinking of adding an interactive chatbot interface with the ApiMedic API service. 


## Friday, September 13, 2023

Today, I worked on...
    - Configuring the docker-compose.yml file to launch a server on localhost:8080 for the static site
    - Creating the HTML structure of the static page by linking the CSS file, Google Font, Favicon, and the JavaScript file.
    - Creating the spinning logo using Photoshop to center and crop the logo and CSS transform animation.
    - Configuring the CSS font, colors, FlexBox container, and fading animations by changing opacity
    - Installing Material UI for the second/third prompt project

Today, I overcame these struggles...
    - Making the content center vertically on the page using FlexBox. align-items should have been simple but I learned that the height of the body has to be set in order to know where center is.
    - After the content faded out, the content would reset/reappear before being redirected. In the JavaScript function begin(), I added display = 'none' to make the content stay gone.

Today's blockers are...
    - The same TCP error as before. Now that the static site is complete, its time to tackle this again.

Notes:
    - The planning paid off and came together well. There were some tweaks that needed to be made to the design. The original concept was clicking the icon to show the text then clicking the text to hide it. While I got this to work, it wasn't intuitive so I changed the design to resemble a start screen. While it doesn't seem like much, I implemented all I set out to do.


## Monday, September 25, 2023

Today, I worked on...

Today, I overcame these struggles...

Today's blockers are...

Notes: