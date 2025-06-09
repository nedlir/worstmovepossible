import os
from dotenv import load_dotenv


class EnvConfig:
    def __init__(self, STOCKFISH_PATH, CSV_PATH, OUTPUT_FORMAT="console",
                 OUTPUT_FILE="analysis_results.json", NUM_PUZZLES=1):
        self.STOCKFISH_PATH = STOCKFISH_PATH
        self.CSV_PATH = CSV_PATH
        self.OUTPUT_FORMAT = OUTPUT_FORMAT
        self.OUTPUT_FILE = OUTPUT_FILE
        self.NUM_PUZZLES = NUM_PUZZLES


load_dotenv()

ENV_VARIABLE = EnvConfig(
    STOCKFISH_PATH=os.getenv('STOCKFISH_PATH', ''),
    CSV_PATH=os.getenv('CSV_PATH', ''),
    OUTPUT_FORMAT=os.getenv('OUTPUT_FORMAT', 'console'),
    OUTPUT_FILE=os.getenv('OUTPUT_FILE', 'analysis_results.json'),
    NUM_PUZZLES=int(os.getenv('NUM_PUZZLES', '1'))
)

if not ENV_VARIABLE.STOCKFISH_PATH or not ENV_VARIABLE.CSV_PATH:
    raise ValueError("STOCKFISH_PATH and CSV_PATH must be set in .env file")
