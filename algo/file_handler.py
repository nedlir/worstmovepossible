import csv
import json


def process_csv(csv_path, num_puzzles):
    with open(csv_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for i, row in enumerate(csv_reader):
            if i >= num_puzzles:
                break
            yield row['FEN'], row['PuzzleId']


def save_results_to_json(puzzle_result, output_file):
    try:
        with open(output_file, 'a', encoding='utf-8') as file:
            if file.tell() == 0:
                file.write('[\n')

            json.dump(puzzle_result, file, indent=4, ensure_ascii=False)
            file.write(',\n')

        print(
            f"\nResult for puzzle {puzzle_result['puzzle_id']} successfully saved to {output_file}")

    except Exception as e:
        print(f"\nFailed to save result to JSON: {str(e)}")


def handle_output(puzzle_result, output, output_format, output_file):
    if output_format in ['json', 'both']:
        json_file = output_file or 'analysis_results.json'
        save_results_to_json(puzzle_result, json_file)

    if output_format in ['console', 'both']:
        print('\n'.join(output))
