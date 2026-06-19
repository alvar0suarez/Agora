import 'package:core/src/models/review_card.dart';
import 'package:core/src/models/review_log.dart';

/// Access to SRS cards and their review history.
abstract interface class ReviewRepository {
  /// Cards whose next due date is at or before [asOf] (defaults to now),
  /// i.e. the cards to review in this session.
  Future<List<ReviewCard>> getDueCards({DateTime? asOf});

  /// Returns the card with [id], or null if none exists.
  Future<ReviewCard?> getCard(String id);

  /// All cards derived from the given word.
  Future<List<ReviewCard>> getCardsForWord(String wordId);

  /// Inserts [card], or updates it if one with the same id already exists.
  Future<void> upsertCard(ReviewCard card);

  /// Appends a review [log]. Logs are immutable and never overwritten.
  Future<void> logReview(ReviewLog log);

  /// Review history for [cardId], newest first.
  Future<List<ReviewLog>> getLogsForCard(String cardId);
}
