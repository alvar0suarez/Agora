// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_progress.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_UserProgress _$UserProgressFromJson(Map<String, dynamic> json) =>
    _UserProgress(
      streak: (json['streak'] as num?)?.toInt() ?? 0,
      totalXp: (json['totalXp'] as num?)?.toInt() ?? 0,
      level: (json['level'] as num?)?.toInt() ?? 1,
      wordsLearned: (json['wordsLearned'] as num?)?.toInt() ?? 0,
      lessonsCompleted: (json['lessonsCompleted'] as num?)?.toInt() ?? 0,
      lastActiveAt: json['lastActiveAt'] == null
          ? null
          : DateTime.parse(json['lastActiveAt'] as String),
    );

Map<String, dynamic> _$UserProgressToJson(_UserProgress instance) =>
    <String, dynamic>{
      'streak': instance.streak,
      'totalXp': instance.totalXp,
      'level': instance.level,
      'wordsLearned': instance.wordsLearned,
      'lessonsCompleted': instance.lessonsCompleted,
      'lastActiveAt': instance.lastActiveAt?.toIso8601String(),
    };
