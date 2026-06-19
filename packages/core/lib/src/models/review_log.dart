import 'package:core/src/models/enums.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'review_log.freezed.dart';
part 'review_log.g.dart';

/// An immutable record of a single review of a review card.
///
/// Logs are append-only: they are the source of truth for progress analytics
/// and (in Phase 2) for cross-device sync, where they merge by union rather
/// than last-write-wins.
@freezed
abstract class ReviewLog with _$ReviewLog {
  const factory ReviewLog({
    required String id,

    /// Id of the review card that was reviewed.
    required String cardId,

    /// The rating the learner gave.
    required ReviewRating rating,

    /// When the review happened.
    required DateTime reviewedAt,

    /// Interval (days) the card was scheduled for as a result of this review.
    required int scheduledDays,
  }) = _ReviewLog;

  factory ReviewLog.fromJson(Map<String, dynamic> json) =>
      _$ReviewLogFromJson(json);
}
