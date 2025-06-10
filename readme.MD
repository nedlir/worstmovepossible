## About

Most chess tools expect you find the best move. This one does the opposite.

This is a puzzle building tool and a live website built around spotting _disasters_.
If you ask a chess player what the worst move in any position is, the correct answer would be "resigning", which is technically correct, but kind of a boring answer.

This project started because I’m not a very good chess player, and I realized it was mostly because I kept shooting myself in the foot. My defensive play suffered since I was always too focused on attacking, missing the sneaky threats my opponents were formulating up while my attention was locked on offense.

This project began as a joke: what if you trained yourself to spot the worst move instead of the best? But at some point, it stopped being just a joke, and I realized there might be some actual value in it.

This might help your tactics. Might help your general awareness. Might just be entertaining in a chaotic kind of way. No guarantees, but I believe it's more fun than memorizing 20 moves of the [Sicilian Defence, Najdorf Variation](https://en.wikipedia.org/wiki/Sicilian_Defence,_Najdorf_Variation).

Hoping you can find your value in it whether it's entertainment or actually getting better at the game.

## Quick Start (solve puzzles)

If the domain’s still alive, check it out at [worstmovepossible.com](https://www.worstmovepossible.com)

### Want to run it locally?

1. **Install Docker**

If you don't already have it, [download Docker](https://docs.docker.com/get-docker/).

2. **Clone the repo**

```
git clone https://github.com/yourusername/worstmove-possible.git
cd worstmove-possible
```

3. **Build and run with Docker Compose**

```
docker-compose up
```

4. **Open in your browser**

Go to `http://localhost:5173`

## Creating new puzzles in Python

The puzzles creation algorithm can be run directly in Python to process chess puzzles and evaluate the worst moves using Stockfish.

### Prerequisites

- [Python 3.x](https://www.python.org/downloads/)

- [Stockfish chess engine](https://stockfishchess.org/download/)
- Input CSV file with `FEN` and `PuzzleId` columns from [lichess.org open database](https://database.lichess.org/)

### Steps

See the code in [`algo/`](algo/) for this.

0. **Install all python libraries used by running:**

```
pip install requirements.txt
```

1. **Configure Environment Variables**

   Create a `.env` file in the project root with at least:

```
STOCKFISH_PATH=/path/to/stockfish
CSV_PATH=/path/to/puzzles.csv
OUTPUT_FORMAT=console 'json' or 'both'
OUTPUT_FILE=analysis_results.json
NUM_PUZZLES=AS_MANY_AS_YOU_WANT
```

2. **Run the Main Script**

From the project root, run:

```
python algo/main.py
```

This will:

- Load configuration from `.env`
- Initialize Stockfish
- Read FENs from the CSV file
- For each puzzle, evaluate all legal moves and rank them from worst to best
- Output the top 3 worst moves for each puzzle to the console and/or JSON file

3. **Output**

- Console output shows the puzzle details and worst moves with evaluations and reply sequences.
- If `OUTPUT_FORMAT` includes `json`, results are saved incrementally to the specified JSON file.

4. **Filtering Results (Optional)**

After analysis, you can filter puzzles based on mate or evaluation criteria (or any other criteria you set...) using:

```
python algo/filtered.py
```

This script then reads the analysis results and writes filtered puzzles to a new JSON file.

I have made this 2 stages filtration to support future usage of multithreaded puzzle creation.

If you want to add puzzles, you have to use the filtration to verify that the worst move you chose is the significantly worst move possible.
