// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'fsrs_card_state.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_FsrsCardState _$FsrsCardStateFromJson(Map<String, dynamic> json) =>
    _FsrsCardState(
      due: DateTime.parse(json['due'] as String),
      stability: (json['stability'] as num?)?.toDouble() ?? 0,
      difficulty: (json['difficulty'] as num?)?.toDouble() ?? 0,
      elapsedDays: (json['elapsedDays'] as num?)?.toInt() ?? 0,
      scheduledDays: (json['scheduledDays'] as num?)?.toInt() ?? 0,
      reps: (json['reps'] as num?)?.toInt() ?? 0,
      lapses: (json['lapses'] as num?)?.toInt() ?? 0,
      state:
          $enumDecodeNullable(_$FsrsStateEnumMap, json['state']) ??
          FsrsState.newCard,
      lastReview: json['lastReview'] == null
          ? null
          : DateTime.parse(json['lastReview'] as String),
    );

Map<String, dynamic> _$FsrsCardStateToJson(_FsrsCardState instance) =>
    <String, dynamic>{
      'due': instance.due.toIso8601String(),
      'stability': instance.stability,
      'difficulty': instance.difficulty,
      'elapsedDays': instance.elapsedDays,
      'scheduledDays': instance.scheduledDays,
      'reps': instance.reps,
      'lapses': instance.lapses,
      'state': _$FsrsStateEnumMap[instance.state]!,
      'lastReview': instance.lastReview?.toIso8601String(),
    };

const _$FsrsStateEnumMap = {
  FsrsState.newCard: 0,
  FsrsState.learning: 1,
  FsrsState.review: 2,
  FsrsState.relearning: 3,
};
