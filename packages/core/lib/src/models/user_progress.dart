import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_progress.freezed.dart';
part 'user_progress.g.dart';

/// Aggregate learner progress shown on the dashboard.
///
/// XP only ever accumulates (no lives, no loss). The streak uses "ember decay"
/// rather than a hard reset, so [lastActiveAt] is kept to compute decay.
@freezed
abstract class UserProgress with _$UserProgress {
  const factory UserProgress({
    /// Current streak length in days.
    @Default(0) int streak,

    /// Lifetime accumulated academic XP.
    @Default(0) int totalXp,

    /// Current level, derived from [totalXp].
    @Default(1) int level,

    /// Distinct words the learner has mastered.
    @Default(0) int wordsLearned,

    /// Number of lessons completed.
    @Default(0) int lessonsCompleted,

    /// Last day the learner was active, used for streak / ember decay.
    DateTime? lastActiveAt,
  }) = _UserProgress;

  const UserProgress._();

  /// A blank progress record for a brand-new learner.
  factory UserProgress.initial() => const UserProgress();

  factory UserProgress.fromJson(Map<String, dynamic> json) =>
      _$UserProgressFromJson(json);
}
