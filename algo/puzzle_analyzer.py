from chess_engine import initialize_stockfish, analyze_position
from file_handler import save_results_to_json, process_csv, handle_output


def get_side_to_move(fen):
    return 'Black' if 'b' in fen.split()[1] else 'White'


def get_player_for_move(index):
    return 'White' if index % 2 == 0 else 'Black'


def format_moves_list(sequence):
    return [f"{'White' if i % 2 == 0 else 'Black'}: {move}" for i, move in enumerate(sequence)]


def format_move_sequence(move_data):
    if not move_data['move_sequence']:
        return ""

    sequence = [move_data['uci']] + move_data['move_sequence']
    formatted_moves = format_moves_list(sequence)
    sequence_type = "Mate sequence" if move_data['is_mate'] else "Best continuation"
    return f"\n {sequence_type}: " + " → ".join(formatted_moves)


def create_puzzle_result(puzzle_id, fen):
    return {
        'puzzle_id': puzzle_id,
        'fen': fen,
        'side_to_move': get_side_to_move(fen),
        'worst_moves': []
    }


def create_move_entry(rank, move_data):
    return {
        'rank': rank,
        'uci': move_data['uci'],
        'evaluation': move_data['evaluation'],
        'is_mate': move_data['is_mate'],
        'mate_in': move_data['mate_in'],
        'move_sequence': move_data['move_sequence']
    }


def format_evaluation(move_data):
    if move_data['is_mate']:
        return f"Mate in {move_data['mate_in']}"
    return f"Score: {move_data['evaluation']}"


def generate_puzzle_header(puzzle_id, fen):
    return [
        f"\n{'='*50}",
        f"Analyzing Puzzle {puzzle_id}",
        f"FEN: {fen}",
        f"Side to move: {get_side_to_move(fen)}",
        "\nTop 3 Worst Moves:"
    ]


def generate_move_output(rank, move_data):
    eval_str = format_evaluation(move_data)
    sequence_str = format_move_sequence(move_data)
    return f"{rank}. {move_data['uci']} ({eval_str}){sequence_str}"


def process_single_move(rank, move_data, puzzle_result):
    move_entry = create_move_entry(rank, move_data)
    puzzle_result['worst_moves'].append(move_entry)
    return generate_move_output(rank, move_data)


def analyze_single_puzzle(stockfish, puzzle_id, fen):
    puzzle_result = create_puzzle_result(puzzle_id, fen)
    output = generate_puzzle_header(puzzle_id, fen)

    sorted_moves = analyze_position(stockfish, fen)
    for rank, move_data in enumerate(sorted_moves[:3], 1):
        move_output = process_single_move(rank, move_data, puzzle_result)
        output.append(move_output)

    return puzzle_result, output


def handle_puzzle_analysis(stockfish, fen, puzzle_id, results, output_format, output_file):
    puzzle_result, output = analyze_single_puzzle(stockfish, puzzle_id, fen)
    results.append(puzzle_result)
    handle_output(puzzle_result, output, output_format, output_file)


def finalize_json_output(output_format, output_file):
    if output_format in ['json', 'both']:
        with open(output_file or 'analysis_results.json', 'a', encoding='utf-8') as file:
            file.write('\n]')


def process_single_puzzle_with_error_handling(stockfish, fen, puzzle_id, results, output_format, output_file):
    try:
        handle_puzzle_analysis(stockfish, fen, puzzle_id,
                               results, output_format, output_file)
        return True
    except Exception as e:
        print(f"Error analyzing puzzle {puzzle_id}: {str(e)}")
        return False


def process_all_puzzles(stockfish, csv_path, num_puzzles, output_format, output_file):
    results = []
    try:
        for fen, puzzle_id in process_csv(csv_path, num_puzzles):
            process_single_puzzle_with_error_handling(
                stockfish, fen, puzzle_id, results, output_format, output_file)
        return results
    except Exception as e:
        print(f"Error processing puzzles: {str(e)}")
        return None


def finalize_analysis(results, output_format, output_file):
    if results:
        finalize_json_output(output_format, output_file)
    return results


def analyze_puzzles(csv_path, stockfish_path, num_puzzles=1, output_format='console', output_file=None):
    try:
        stockfish = initialize_stockfish(stockfish_path)
    except Exception as e:
        print(f"Failed to initialize chess analyzer: {str(e)}")
        return None

    results = process_all_puzzles(
        stockfish, csv_path, num_puzzles, output_format, output_file)
    return finalize_analysis(results, output_format, output_file)
