# Shoretening a URL:

I have used **Node.js** for my server side rendering, **React** as my frontend, **MongoDB** as my database and **Redis** to cache the shortened URLs.

# Steps to run this application:
1. Clone the repository.
2. Open a redis server.
3. Go to the directory where you have installed mongodb and run ```mongod``` from your terminal.
4. Go to the cloned repository.
5. Run ```npm install``` from your terminal to install all the dependencies
6. Run ```nodemon server.js``` from you terminal to start the server.
7. Go to the clients directory and run ```npm install```.
8. run ```npm start``` to start the React app.
9. Open ```localhost:3000``` on your browser.


## Assumptions made for this application

1. I have assumed that we only need to show the requested shortened URL for the given original URL. 
2. Given a URL, our service should generate a shorter and unique alias of it.
3. When users access a short link, our service should redirect them to the original link.
4. The system should be highly available.
5. URL redirections hould happen in real-time with minimal latency. This is why I have used Redis to cache our data. 
6. Shortened links should not be predictable.
7. Our system would be read heavy, this is the reason of me using a NoSQL database. 

## Limitations of this application

1. Caching would be great if we could store 20% of our recently used data into the cache. I have not implemented this feature for our caching system due to time constraint.
2. We can also use a NoSQL database like Cassandra for this system since it has faster writes and does not sacrifice read efficiency.
3. To scale out our database, we need to partition it so that it can store information about billions of URL. 
4. After partioning we can also use consistent hashing to avoid overloading problems.
5. We can also get same short url for different original url due to random hashing. 
