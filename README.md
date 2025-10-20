# SharkLine Golf - SLG 

## FIGMA USER FLOWS AND USER STORIES

https://www.figma.com/board/WcUu61gcBbnunnmAfSoxuP/User-Flows---Stories--Community-?node-id=0-1&t=yO5IvsVJvJYLwUBo-1


## Summary

Introducing SLG, the ultimate golf companion designed to enhance your game and connect you with fellow golfers! Whether you're a casual player or a seasoned pro, our app offers a seamless experience for organizing and enjoying golf games.

Key Features:

Group Management: Easily select the number of players in your group and find suitable golf games tailored to your needs.

Game Database: Access a comprehensive database of golf games, complete with detailed explanations on how to play each format.

Scorekeeping Made Easy: Keep track of scores effortlessly, with automatic calculations based on player handicaps for a fair and competitive experience.

Extensive Course Database: Explore thousands of golf courses, complete with scorecards, slope ratings, and yardages, ensuring you have all the information you need at your fingertips.

User Profiles: Create and customize your profile to track your progress, connect with friends, and share your golfing achievements.


Join a community of golf enthusiasts and elevate your game with TeeUp where every swing counts! Download now and tee off into a world of fun and competition!


## Golf Games

Players can first select the total number of players that are in their group. TeeUp will provide them a list of different games which will work with the total number of players.

Players may also choose a custom game or customize the pre-set game chosen. 


## Scoring Formats

These define how players or teams are scored. There are 3 primary scoring formats however some games can have a combination of these styles within a match:


  ### StrokePlay = "Stroke Play",         // Total number of strokes over 18 holes
  ### MatchPlay = "Match Play",           // Holes are won/lost/tied based on individual hole performance.
  ### PointsBased = "Points-Based"        // Players earn points based on hole performance.	
  

## GamePlay Formats
These define how players or teams play their ball:

  ### Individual = "Individual Play",                     // Each player plays their own ball
  ### BestBall = "Best Ball",                             // Each player plays their ball and best score counts
  ### Scramble = "Scramble",                              // All play, best shot is selected each time
  ### Shamble = "Shamble",                                // Drive selected, then all play own ball
  ### AlternateShot = "Alternate Shot",                   // Teammates alternate shots
  ### Modified = "Modified/Hybrid Format"                 // Combination of styles


## Player Matchup Formats
These define the format in which the players or teams are matched up. 

  ### Solo = "Solo",                                    // Solo Play
  ### H2H = "Head to Head",                             // H2H matchup - 1v1, 1v1v1, 1v1v1v1
  ### H2HHybrid = "Head to Head Hybrid",                // H2H matchup hyrbid - 2v1, 1v3, 4v1 etc...
  ### TeamPlay = "Team Play",                           // Team of 2 or more vs another team or 
  ### ModifiedMatchup= "Modified Match Up"              // Combination of matchup styles



 ________________________

## Games

 ### 1. Basic Stroke Play (Medal Play)
 
 ### 2. Match Play (Singles)
 
 ### 3. Match Play (Team)

 ### 4. Basic Scramble

 ### 5. Basic Shamble

 ### 6. Stableford

 ### 7. Nassau 

 ### 8. Skins 

 ### 9. Wolf

 ### 10. Bingo, Bango, Bongo

 ### 11. Vegas

 ### 12. 9-Ball (Threesomes Only)

 ### 13. Snake
 
 ### 14. Hollywood

 ### 15. Custom Game


min player
max player

_______________________________________________________________

## Databases

TeeUp will need to utilize the following data sets:

1. Database storing each golf game, including the rules, scoring, player criteria.
     -This may be a custom database I create
     -There will need to be flags on each golf game, primarily for number of players allowed. This way when a user indicates the total players, it will only display the appropriate games that meet the criteria
   
2. User Database
     - This will be have components of an interactive social application where users can create profiles and add other users and create groups
       
3. Course Database - Will need to store the following:
     - Course Names and Locations
     - Course Score Card - So users can input scores in the application and have it align with the holes of the course
     - Course Rating - USGA Course Rating is an evaluation of the difficulty of a golf course for scratch golfers. (More specifically, the number is an estimate of the average scores of the best 50-percent of rounds played by scratch golfers at         the course being rated.)
       Course rating is very easy to understand because it is expressed in strokes. A par-72 course that is easy might have a course rating of 68.9; one that is difficult might have a course rating of 74.5. That means that a scratch golfer              should be expected to average 68.9 strokes in his better rounds at the easier              course; and 74.5 at the more difficult one.
     - Course Slope Rating - The slope rating of a golf course is a measurement of it's relative difficulty for a bogey golfer compared to a scratch golfer. This value ranges from 55 (least difficult) to 155 (most difficult)

To put it another way: USGA Course Rating tells the best golfers how hard a golf course actually plays; USGA Slope Rating indicates how much harder the course plays for "regular" (meaning not among the best) golfers.
   
4. Database to store historic data
     - Users will want to store their playing history 

https://golfpadgps.com/ - Reference app

_______________________________________________________________

## Handicap

A USGA Handicap Index is a numerical value that represents a golfer's demonstrated playing ability, calculated based on their past scores relative to the difficulty of the courses 
and tees played, essentially providing a portable measure of how well a golfer plays across different courses; it is the official term used by the United States Golf Association to describe a golfer's handicap. 

### Player's Handicap Calculation:
It is calculated by averaging the best 8 "Score Differentials" from a golfer's most recent 20 rounds, taking into account the course difficulty and playing conditions. 

### Purpose:
The Handicap Index allows golfers to compete fairly against others, regardless of the course they are playing on
 
Through the USGA handicap system, players can enter their USGA handicap (A further iteration may be able to API that data in from USGA)

The handicap scoring algorithm will then be applied to different games to ensure the proper number of strokes, points and other scoring is fairly integrated. 

The handicap for a player for a given match is not only based on their actual handicap value, but also with the course rating. If a player is a 10 handicap, and they are playing a tougher golf course, their course handicap may actually be 13.

This will be an optional tool for players to apply when they play a game.

### Course Handicap Calculation:
To convert a player's Handicap Index into a Course Handicap for a specific course and set of tees, use this formula:

Course Handicap = (Handicap Index) × (Slope Rating ÷ 113) + (Course Rating - Par)

Explanation of Terms

Handicap Index: A portable number representing your potential scoring ability (e.g., 10.4)

Slope Rating: How difficult the course is for a bogey golfer compared to a scratch golfer (range: 55–155; 113 is average)

Course Rating: What a scratch golfer is expected to shoot (e.g., 71.2)

Par: The expected score for the course (e.g., 72)

Say a golfer has a Handicap Index of 12.3, and they're playing from a tee with:

Slope Rating: 130
Course Rating: 70.5
Par: 72

Course Handicap = 12.3 × (130 / 113) + (70.5 - 72)
                = 12.3 × 1.1504 + (-1.5)
                = 14.15 - 1.5
                = 12.65 → Rounded = 13

So this player’s Course Handicap = 13.



### How Handicaps are Calulated in Scoring Matches:

Once a player(s) handicap for a match is calculated, in stroke play, it is fairly simple to determine the handicap for scoring the match.

Each hole on every golf course is assigned a difficulty value ranging from 1-18, 1 being the "hardest" and 18 being the "easiest" (assuming it's a standard 18 hole course).

If a player has a handicap of 7 for a given match, they will, as a result, receive an additional stroke on the 7 most difficult holes.

There will be 2 scores for any player using a handicap in their match

### GROSS SCORE: This is the score (in stroke play) the player receives without factoring in the handicap.
### NET SCORE: This is the score (in stroke play) the player receives once the handicap is factored into the score.

E.g. Assume a player has a handicap of 7 for a given match. They are playing the 2nd hole which happens to be the #1 handicap hole on the course (meaning it's considered the most difficult hole on the course). This 2nd hole that this player is playing is a Par 5. Now assume this player 
scores a 6 on this hole meaning it took them 6 strokes to get the ball in the hole. Because this is the #1 most difficult hole on the course AND the player has a handicap of 7, then they will receive a Net Par of 5 when the hole is scored.


### Additional Handicap Calculations

In some formats (e.g., Best Ball, Scramble, Match Play), you apply allowances to the Course Handicap to get the Playing Handicap:

### Stroke Play: 100% of the Handicap

### Best-Ball: 85% (for men), 90% (for women)

### Scramble: Team-based formulas (e.g., 35% of A + 15% of B)

### Custom: Users will be able to enter a custom handicap allowance based on a percentage

So: 

Playing Handicap = Course Handicap × Format Allowance %



## Example Formulas

📄 Setup

Assume:

A2: Handicap Index (e.g., 12.3)
B2: Slope Rating (e.g., 130)
C2: Course Rating (e.g., 70.5)
D2: Course Par (e.g., 72)
E2: Allowance % (e.g., 0.85 for 85%)

### JS Code

function calculateCourseHandicap(handicapIndex: number, slope: number, courseRating: number, par: number): number {
  const rawHandicap = handicapIndex * (slope / 113) + (courseRating - par);
  return Math.round(rawHandicap);
}

function calculatePlayingHandicap(handicapIndex: number, slope: number, courseRating: number, par: number, allowancePercent: number): number {
  const courseHandicap = calculateCourseHandicap(handicapIndex, slope, courseRating, par);
  return Math.round(courseHandicap * allowancePercent);
}

// Example
const courseHcp = calculateCourseHandicap(12.3, 130, 70.5, 72); // => 13
const playingHcp = calculatePlayingHandicap(12.3, 130, 70.5, 72, 0.85); // => 11


### Python Code

def calculate_course_handicap(handicap_index, slope_rating, course_rating, par):
    raw_handicap = handicap_index * (slope_rating / 113) + (course_rating - par)
    return round(raw_handicap)

def calculate_playing_handicap(handicap_index, slope_rating, course_rating, par, allowance_percent):
    course_handicap = calculate_course_handicap(handicap_index, slope_rating, course_rating, par)
    return round(course_handicap * allowance_percent)


Example:
course_hcp = calculate_course_handicap(12.3, 130, 70.5, 72)  # => 13
playing_hcp = calculate_playing_handicap(12.3, 130, 70.5, 72, 0.85)  # => 11


______________________________________________________________

# Application Sections

## Sign Up Page

Users will sign up based off of their email address.

They will need to create a username 


## Profile Section

TeeUp will have elements of a social app. Users will be able to create their own profile and connect with other users. Since users will have their handicap and other data added, when they add another user and participate in a game, all of their data will be factored in.

1. General Login Information
2. Personal Profile Page
3. Simple dashboard of their matches
4. Current Handicap Index

_______________________________________________________________

## Match Section

Users will set up their matches and find the games to play in this section. 

Users can add in other TeeUp users or set up players without the app as a general player. 

In this section users will do the following:

1. Player Total: Users select the number of players for their match
2. Player Selection: Users can add other TeeUp users or select General Player and provide them with an individual name or team name
3. Course Selection: Select the course. If course is in database, all slope and course rating data along with specific scorecard will be attributed. If course is not in the list, users can manually add this information (not required). 
4. Game Selection:
   - TeeUp will provide the user with a list of games which meet the criteria.
   - There will be a description of the game as well as the rules of the game selected
   - Once selected, users can make certain modifications to the game (will have to limit the types of modifications to ensure the rules of the game or automatic scoring isn't impacted)
   - If the user selects "Custom Game" they will need to input certain criteria such as (scoring stlye: stroke play, match play, hybrid) and determine other rules.
   - Wagering - If the group wants to wager money, they can determine the wager amounts, pot, so TeeUp can track and score the winnings properly.
  
5. Match Preview: Once game selection has been made, users will see a Match Preview. This preview will display an overview of the match, which holes certain players have strokes on (per the handicap indexes), and the stakes. This is generated prior to selecting "Begin Match" to account for any edits or changes that need to be made.
6. Start Match - (There will have to a unique match ID or other identifier which will allow users on different networks to be part of the same match).
_______________________________________________________________

## TeeUp Games Section

This section of the application will provide detailed descriptions and rules of the different games. 

1. Games Overview: Detailed descriptions of each game.
2. Favorites
3. Custom Game Creation: Users can create custom games with certain criteria which will then appear in their games list.

_______________________________________________________________

## ScoreCard

The scorecard will allows users to input their scores in real time and be reflected for each user in the match.

This scoreboard will be adjusted to the game and auto update any changes in score due to the handicap index.

In this section, live status of the where the match stands, the current wager balance per player and other details of the ongoing match.

_______________________________________________________________


# Pricing


Free App

Pro 

_______________________________________________________________


# Tech Stack

### Database: Mongo DB

### Frontend: ??

### Backend: ??

_______________________________________________________________

# TO DO


1. Define the rules for each golf game so we can build the logic for scoring as well as ensuring only games which meet player number criteria populate appropriately.
2. Find a golf course database where we will pull the course information - This will need to contain the following:
       a. Score Card for course
       b. Slope rating and Course rating for each tee as well as course length from each tee

https://rapidapi.com/slashgolf/api/live-golf-data
https://documenter.getpostman.com/view/1756312/UVeDsT2b

4. Write the logic for scoring


## Template/References from Loveable

**URL**: https://lovable.dev/projects/29ade2e2-9c53-416b-8bf5-66555e067fc4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/29ade2e2-9c53-416b-8bf5-66555e067fc4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/29ade2e2-9c53-416b-8bf5-66555e067fc4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
