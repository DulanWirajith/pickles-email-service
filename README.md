# PICKLES-EMAIL-SERVICE

## Stay in touch

- Author - [Dulan Wirajith](https://www.linkedin.com/in/dulanwirajith/)
- Website - [https://dulanwirajith.com](https://dulanwirajith.com/)


## Committing without running pre-commit hook
```
git commit -m 'commit message' --no-verify
```

## Committing using commitizen package
commitizen package helps to work with conventional commits

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

```
git cz
```

## Tech stack
```
- NestJS: for handling server asynchronously and API development
- Docker: for containerizing different services
- PostgreSQL: for the database
- Prisma: for database abstraction
- RabbitMQ: for communicating between different services
- BullMQ: for queue management in the Email Service
- Redis: helper to BullMQ
- Nodemailer: for mailing service
- SendGrid: for mailing service
- Pusher: for socket based communication 
- Jest: for unit testing
```

For running the project, I would like to mention that a .env file is required. To facilitate this, I suggest that you copy the qa.env file and rename it to .env in order to run the project without any issues.

If you need to check the PostgreSQL database, you can use the following credentials:

```
Host: 18.188.114.169
Port: 5432
Username: postgres
Password: codewithdulan
Database: pickles-email
```

If you prefer a graphical user interface to view the PostgreSQL database, you can run 
```bash
npx prisma studio
```` 
in the terminal. This will launch Prisma Studio, which is an easy-to-use database management tool. From there, you can explore the database schema, view the data in the tables, and run queries.

Please note that you need to have Prisma installed globally on your machine to use this command. If you do not have it installed, you can install it by running 
```bash
npm install -g prisma
``` 

If you have any issues or require further assistance, please do not hesitate to contact me.

Please note that the PostgreSQL database is hosted on my AWS EC2 instance.

## Installation

1. Clone the repository:
```bash
git clone git@github.com:DulanWirajith/pickles-email-service.git
```
2. Install dependencies:
```bash
cd pickles-email-service
yarn install
```

## Running the app
### You can run the app in three ways:

### 1 . Run the full project locally.
1. Start the server:
```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

### 2 . Run using the Docker image hosted on Docker Hub.
1. Pull the image:
```bash
docker pull dulanwirajith/pickles-email:pes-qa
```
2. Start the container:
```bash
docker run -p 3000:3000 dulanwirajith/pickles-email:pes-qa
```
### 3 . Run using Docker Compose.
1. Start the services:
```bash
docker-compose up -d 
```

## Folder Structure
![Screenshot](doc-images/Screenshot%202023-04-09%20at%2023.42.39.png)

## API Documentation
### Postman Documentation
https://www.postman.com/refcoins-va/workspace/pickles/

### Swagger Documentation
http://localhost:3000/api

![Screenshot](doc-images/Screenshot%202023-04-09%20at%2022.25.30.png)

![Screenshot](doc-images/Screenshot%202023-04-09%20at%2022.25.46.png)


## Proofs

### handle mail send
When you trigger **handle mail send** request, you will see response came back with 201 status code and empty body.
![Screenshot](doc-images/Screenshot%202023-04-09%20at%2023.22.51.png)


When the "handle mail send" API endpoint is hit, Pickles-Email-Service will add the request data to a BullMQ for sending the email. The service will respond with a 201 status code.

BullMQ, with Redis, will handle the email sending process using Nodemailer and SendGrid. When the email sending event starts, the request data will be stored in a PostgreSQL database.

When the email sending process fails, the email's status will be set to "FAILED". There is also an attemptCount variable that keeps track of how many times Nodemailer retries sending the email.

Additionally, there is a cron job that runs every 10 minutes. It checks for all the failed email sending attempts that have occurred within the last hour and resends them with lower priority. This process ensures that no important emails are lost due to temporary failures or network issues.

When a new email send request comes to the server and is being processed, the server will trigger a "new_email_notification" event using Pusher. This event can be used in the frontend admin dashboard to display a notification to the user that a new email has been sent.

```
- A user sends an email send request to the server.
- The server receives the request and adds it to a BullMQ queue for processing.
- Pickles-Email-Service retrieves the email send request data from the BullMQ queue and attempts to send the email using Nodemailer and SendGrid.
- If the email sending is successful, the status of the email is set to "SENT".
- If the email sending fails, the status of the email is set to "FAILED" and the attemptCount variable is incremented.
- A cron job runs every 10 minutes to check for failed email sending attempts that have occurred within the last hour.
- For each failed email sending attempt, the email is resent with lower priority.
- During the email sending process, the server triggers a "new_email_notification" event using Pusher to update the frontend admin dashboard.
```
![Screenshot](doc-images/Screenshot%202023-04-08%20at%2018.03.53.png)

![Screenshot](doc-images/Screenshot%202023-04-09%20at%2014.24.19.png)

![Screenshot](doc-images/Screenshot%202023-04-09%20at%2014.14.14.png)


This feature enhances the user experience by providing real-time updates and feedback, which can help to improve user engagement and satisfaction.

### get mails
When you trigger **get mails** request, you will see response came back with 200 status code with pagination response.
![Screenshot](doc-images/Screenshot%202023-04-09%20at%2023.25.16.png)

![Screenshot](doc-images/Screenshot%202023-04-09%20at%2014.13.00.png)


## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Note
I'd also like to mention two branches in our GitHub repository: **uat** and **dev-with-rabbitmq**.

If you want to run only the Pickles Email Server, you can try using the **uat** branch. On the other hand, if you're interested in exploring a more complex setup that includes RabbitMQ for communication, you can try the **dev-with-rabbitmq** branch. This branch contains two separate applications: users and pickles-email-server.

To run the dev-with-rabbitmq branch, you can use the docker-compose up command. This will start both the users and pickles-email-server applications, and they will communicate with each other using RabbitMQ.
