import 'package:core/src/models/enums.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'lesson.freezed.dart';
part 'lesson.g.dart';

/// A structured curriculum unit.
///
/// [content] holds the grammar explanation (markdown). The full exercise model
/// is built in the exercises milestone; for now a lesson references its
/// exercises and vocabulary by id so the schema and seed format are stable.
@freezed
abstract class Lesson with _$Lesson {
  const factory Lesson({
    required String id,

    /// Sequential unit number in the curriculum (1-based).
    required int unit,

    required String title,

    /// Short grammar topic label, e.g. "Presente activo indicativo".
    required String grammarTopic,

    required LessonDifficulty difficulty,

    /// Grammar explanation for the unit, as markdown.
    required String content,

    /// Ids of words introduced by this lesson.
    @Default(<String>[]) List<String> vocabularyWordIds,

    /// Ids of exercises belonging to this lesson.
    @Default(<String>[]) List<String> exerciseIds,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
}
