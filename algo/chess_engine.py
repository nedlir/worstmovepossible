import chess
from stockfish import Stockfish
import os


def initialize_stockfish(stockfish_path, depth=20, skill_level=20):
    if not os.path.exists(stockfish_path):
        raise FileNotFoundError(
            f"Stockfish executable not found at: {stockfish_path}")

    try:
        stockfish = Stockfish(stockfish_path)
        stockfish.set_depth(depth)
        stockfish.set_skill_level(skill_level)
        return stockfish
    except Exception as e:
        raise RuntimeError(f"Failed to initialize Stockfish: {str(e)}")


def update_board_position(board, stockfish, move):
    board.push_uci(move)
    stockfish.set_fen_position(board.fen())


def check_for_mate(eval_after_move, sequence_moves):
    is_mate = eval_after_move['type'] == 'mate'
    mate_in = abs(eval_after_move['value']) + \
        len(sequence_moves) if is_mate else None
    return is_mate, mate_in


def process_best_move(stockfish, board, sequence_moves):
    best_move = stockfish.get_best_move()
    if not best_move:
        return None, None, None

    sequence_moves.append(best_move)
    update_board_position(board, stockfish, best_move)
    eval_after_move = stockfish.get_evaluation()
    is_mate, mate_in = check_for_mate(eval_after_move, sequence_moves)
    return best_move, is_mate, mate_in


def get_move_sequence(stockfish, position_fen, first_move, max_moves=5):
    board = chess.Board(position_fen)
    sequence_moves = []
    is_mate = False
    mate_in = None

    try:
        update_board_position(board, stockfish, first_move)

        for _ in range(max_moves):
            best_move, current_is_mate, current_mate_in = process_best_move(
                stockfish, board, sequence_moves)

            if not best_move or len(sequence_moves) >= max_moves:
                break

            if current_is_mate and not is_mate:
                is_mate = current_is_mate
                mate_in = current_mate_in

    except Exception as e:
        print(f"Error in move sequence analysis: {str(e)}")

    return sequence_moves, is_mate, mate_in


def create_move_data(move, evaluation, sequence, is_mate, mate_in):
    return {
        'move': move,
        'evaluation': evaluation['value'],
        'uci': move.uci(),
        'is_mate': is_mate,
        'mate_in': mate_in if is_mate else None,
        'move_sequence': sequence,
        'evaluation_type': evaluation['type']
    }


def update_evaluation_score(move_data, evaluation):
    if evaluation['type'] == 'mate':
        move_data['evaluation_score'] = 20000 if evaluation['value'] > 0 else -20000
        move_data['is_mate'] = True
        move_data['mate_in'] = abs(evaluation['value'])
    else:
        move_data['evaluation_score'] = evaluation['value']
    return move_data


def evaluate_position(board, stockfish, move):
    board.push(move)
    stockfish.set_fen_position(board.fen())
    return stockfish.get_evaluation()


def evaluate_move(stockfish, board, move, fen):
    evaluation = evaluate_position(board, stockfish, move)
    sequence, is_mate, mate_in = get_move_sequence(stockfish, fen, move.uci())

    move_data = create_move_data(move, evaluation, sequence, is_mate, mate_in)
    move_data = update_evaluation_score(move_data, evaluation)

    board.pop()
    return move_data


def get_sort_key(move_data, is_black_to_move):
    if move_data['is_mate']:
        return (-1, move_data['mate_in'] if move_data['is_mate'] else float('inf'))
    return (1, -move_data['evaluation_score'])


def sort_moves(moves_with_eval, is_black_to_move):
    return sorted(
        moves_with_eval,
        key=lambda x: get_sort_key(x, is_black_to_move),
        reverse=not is_black_to_move
    )


def analyze_position(stockfish, fen):
    board = chess.Board(fen)
    stockfish.set_fen_position(fen)

    legal_moves = list(board.legal_moves)
    is_black_to_move = board.turn == chess.BLACK

    moves_with_eval = [evaluate_move(stockfish, board, move, fen)
                       for move in legal_moves]
    return sort_moves(moves_with_eval, is_black_to_move)
