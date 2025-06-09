import json


def filter_puzzles(data):
    filtered_puzzles = []
    count_condition1 = 0
    count_condition2 = 0
    count_condition3 = 0

    for puzzle in data:
        worst_moves = puzzle.get("worst_moves", [])
        rank_1 = next(
            (move for move in worst_moves if move["rank"] == 1), None)
        rank_2 = next(
            (move for move in worst_moves if move["rank"] == 2), None)

        if rank_1 and rank_2:
            should_copy = False

            # Condition 1: rank 1 is_mate = true and rank 2 is_mate = false
            if rank_1["is_mate"] and not rank_2["is_mate"]:
                should_copy = True
                count_condition1 += 1

            # Condition 2: rank 1 is_mate = true and rank 2 is_mate = true
            elif rank_1["is_mate"] and rank_2["is_mate"]:
                if rank_1["mate_in"] < rank_2["mate_in"]:
                    should_copy = True
                    count_condition2 += 1

            # Condition 3: both moves are not mate
            elif not rank_1["is_mate"] and not rank_2["is_mate"]:
                if abs(rank_1["evaluation"] - rank_2["evaluation"]) >= 700:
                    should_copy = True
                    count_condition3 += 1

            if should_copy:
                filtered_puzzles.append({
                    "puzzle_id": puzzle["puzzle_id"],
                    "fen": puzzle["fen"],
                    "side_to_move": puzzle["side_to_move"],
                    "worst_moves": [
                        {
                            "rank": rank_1["rank"],
                            "uci": rank_1["uci"],
                            "evaluation": rank_1["evaluation"],
                            "is_mate": rank_1["is_mate"],
                            "mate_in": rank_1["mate_in"],
                            "move_sequence": rank_1["move_sequence"]
                        }
                    ]
                })

    return filtered_puzzles, count_condition1, count_condition2, count_condition3


# Read input JSON
with open('puzzles.json', 'r') as file:
    data = json.load(file)

# Apply filtering
filtered_data, count1, count2, count3 = filter_puzzles(data)

# Write filtered data to new JSON file
with open('filtered_puzzles.json', 'w') as file:
    json.dump(filtered_data, file, indent=2)

# Print statistics
print(f"Puzzles copied by condition 1 (rank 1 mate, rank 2 not): {count1}")
print(f"Puzzles copied by condition 2 (both mate, rank 1 shorter): {count2}")
print(f"Puzzles copied by condition 3 (both not mate, large diff): {count3}")
print(f"Total puzzles copied: {count1 + count2 + count3}")
