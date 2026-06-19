import 'package:core/src/models/lesson.dart';

/// Read access to the curriculum.
abstract interface class LessonRepository {
  /// Returns the lesson with [id], or null if none exists.
  Future<Lesson?> getById(String id);

  /// All lessons ordered by [Lesson.unit] ascending.
  Future<List<Lesson>> getAll();

  /// Returns the lesson for curriculum [unit], or null if none exists.
  Future<Lesson?> getByUnit(int unit);
}
