from puzzle_analyzer import analyze_puzzles
from env_config import ENV_VARIABLE


def main():
    try:
        analyze_puzzles(
            ENV_VARIABLE.CSV_PATH,
            ENV_VARIABLE.STOCKFISH_PATH,
            num_puzzles=ENV_VARIABLE.NUM_PUZZLES,
            output_format=ENV_VARIABLE.OUTPUT_FORMAT,
            output_file=ENV_VARIABLE.OUTPUT_FILE
        )
    except Exception as e:
        print(f"An error occurred: {str(e)}")


if __name__ == "__main__":
    main()
