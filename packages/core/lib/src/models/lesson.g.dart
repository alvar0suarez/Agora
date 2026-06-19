// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'lesson.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Lesson _$LessonFromJson(Map<String, dynamic> json) => _Lesson(
  id: json['id'] as String,
  unit: (json['unit'] as num).toInt(),
  title: json['title'] as String,
  grammarTopic: json['grammarTopic'] as String,
  difficulty: $enumDecode(_$LessonDifficultyEnumMap, json['difficulty']),
  content: json['content'] as String,
  vocabularyWordIds:
      (json['vocabularyWordIds'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const <String>[],
  exerciseIds:
      (json['exerciseIds'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const <String>[],
);

Map<String, dynamic> _$LessonToJson(_Lesson instance) => <String, dynamic>{
  'id': instance.id,
  'unit': instance.unit,
  'title': instance.title,
  'grammarTopic': instance.grammarTopic,
  'difficulty': _$LessonDifficultyEnumMap[instance.difficulty]!,
  'content': instance.content,
  'vocabularyWordIds': instance.vocabularyWordIds,
  'exerciseIds': instance.exerciseIds,
};

const _$LessonDifficultyEnumMap = {
  LessonDifficulty.beginner: 'beginner',
  LessonDifficulty.intermediate: 'intermediate',
  LessonDifficulty.advanced: 'advanced',
};
