# reviews
Reviews Component

How to get component running
1) Install all dependencies listed in package.json
2) Create reviews database
  command: mysql -u (your username here) -p < database.schema.sql **no space between the < and database.schema.sql
3) seed the database
  note: you'll need to create a config file in the db folder with your mysql creds and set up to use the reviews db
  module.exports = {
  user: 'your username here',
  password: 'your password here',
  database: 'reviews'
};
  command: npm run-script seed
4) build webpack
  command: npm run-script build:dev
5) fire up server
  command: npm start
7) navigate to localhost:3004

To test
1) Run test script
  command: npm run-script test

How review sentiment is calculated

The db is seeded with a biased function that produces more positive than negative ratings.  Below is a sample set of 20 reviews and their positive/negative review counts.
review_id	  positive	  negative	  total       positivity %
3	          143	        47	        190	        0.7526315789
9	          157	        53	        210	        0.7476190476
2	          150       	52	        202	        0.7425742574
14	        142       	53	        195	        0.7282051282
5	          139       	52	        191	        0.7277486911
8	          140	        55        	195	        0.7179487179
6	          152	        62	        214	        0.7102803738
13	        156	        66	        222	        0.7027027027
4	          126	        56        	182	        0.6923076923
16	        128	        57        	185	        0.6918918919
11	        122	        56	        178	        0.6853932584
12	        137	        67        	204	        0.6715686275
10	        136       	67        	203	        0.6699507389
15	        131	        65        	196       	0.6683673469
18	        122	        62        	184       	0.6630434783
1	          133	        69        	202	        0.6584158416
17	        145	        77        	222	        0.6531531532
7	          122        	67	        189	        0.6455026455

Based on the selection, the scale is as follows for review sentiment:

Positivity %        Sentiment
75+ 	              Overwhelmingly Positive
72-74	              Mostly Positive
68-71	              Mixed
65-67	              Mostly Negative
64-	                Overwhelmingly Negative

______________________________________________________________________________________________________________

Missing or incomplete funtionality

Functionality: awards buttons
What's missing: can't give awards to reviews
Reason: we do not currently have the concept of a logged in user with a user id.  In order to attach an award to a review, a user id must be associated with that award.

Functionality: awards widgets
What's missing: Widgets for each award type (thumbs up for yes, down for no, smiley for funny, and custom awards widgets)
Reason: Time constraints

Functionality: filter capabilities
What's missing: can't see filter dropdowns or select filters
Reason: time constraints for the project

Functionality: load more reviews
What's missing: button to load more reviews at bottom of Helpful Reviews section
Reason: time constraints for the project

Functionality: review author profile
What's missing: link to author profile, author avatar
Reason: time constraints for the project

Functionality: helpful reviews initial filtering
What's missing: only pulling reviews sorted by helpful votes, ignoring date constraint
Reason: this is fake data and to the most 'helpful' reviews, skipping over date filtering here

Functionality: helpful award tally
What's missing: this should probably be calculated by subtracting the helpful count from the unhelpful count in the reviews_awards table.
Reason: Again, because this is fake data, it's simplified to show actual votes

Functionality: tooltips
What's missing: pretty much any tooltip describing ratings or how they're calculated
Reason: Time constraints