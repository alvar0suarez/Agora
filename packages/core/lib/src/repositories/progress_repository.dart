import 'package:core/src/models/user_progress.dart';

/// Access to the single aggregate [UserProgress] record.
abstract interface class ProgressRepository {
  /// Returns the current progress, creating a blank record on first access.
  Future<UserProgress> getProgress();

  /// Persists [progress].
  Future<void> saveProgress(UserProgress progress);

  /// Emits the progress whenever it changes, for reactive dashboards.
  Stream<UserProgress> watchProgress();
}
