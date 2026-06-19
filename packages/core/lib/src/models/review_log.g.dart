// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'review_log.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ReviewLog _$ReviewLogFromJson(Map<String, dynamic> json) => _ReviewLog(
  id: json['id'] as String,
  cardId: json['cardId'] as String,
  rating: $enumDecode(_$ReviewRatingEnumMap, json['rating']),
  reviewedAt: DateTime.parse(json['reviewedAt'] as String),
  scheduledDays: (json['scheduledDays'] as num).toInt(),
);

Map<String, dynamic> _$ReviewLogToJson(_ReviewLog instance) =>
    <String, dynamic>{
      'id': instance.id,
      'cardId': instance.cardId,
      'rating': _$ReviewRatingEnumMap[instance.rating]!,
      'reviewedAt': instance.reviewedAt.toIso8601String(),
      'scheduledDays': instance.scheduledDays,
    };

const _$ReviewRatingEnumMap = {
  ReviewRating.again: 1,
  ReviewRating.hard: 2,
  ReviewRating.good: 3,
  ReviewRating.easy: 4,
};
