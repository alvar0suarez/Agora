import 'package:core/src/models/enums.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'fsrs_card_state.freezed.dart';
part 'fsrs_card_state.g.dart';

/// The persisted FSRS scheduling state of a review card.
///
/// This is a plain value object that lives in `core` so the database can store
/// it and the UI can read it. The actual scheduling algorithm lives in the
/// `srs_engine` package, which consumes and produces this state — keeping the
/// dependency arrow pointing toward `core`.
@freezed
abstract class FsrsCardState with _$FsrsCardState {
  const factory FsrsCardState({
    /// When the card is next due for review.
    required DateTime due,

    /// FSRS memory stability (days). Higher = remembered longer.
    @Default(0) double stability,

    /// FSRS difficulty (roughly 1–10). Higher = harder to retain.
    @Default(0) double difficulty,

    /// Days elapsed since the previous review when last scheduled.
    @Default(0) int elapsedDays,

    /// Interval (days) assigned at the last review.
    @Default(0) int scheduledDays,

    /// Total number of reviews.
    @Default(0) int reps,

    /// Number of times the card lapsed (rated Again while in review).
    @Default(0) int lapses,

    /// Lifecycle state of the card.
    @Default(FsrsState.newCard) FsrsState state,

    /// Timestamp of the last review, or null if never reviewed.
    DateTime? lastReview,
  }) = _FsrsCardState;

  const FsrsCardState._();

  /// A fresh, never-reviewed card due immediately at [now].
  factory FsrsCardState.initial({DateTime? now}) =>
      FsrsCardState(due: now ?? DateTime.now());

  factory FsrsCardState.fromJson(Map<String, dynamic> json) =>
      _$FsrsCardStateFromJson(json);
}
