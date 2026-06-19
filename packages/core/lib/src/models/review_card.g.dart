// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'review_card.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ReviewCard _$ReviewCardFromJson(Map<String, dynamic> json) => _ReviewCard(
  id: json['id'] as String,
  wordId: json['wordId'] as String,
  front: json['front'] as String,
  back: json['back'] as String,
  cardType: $enumDecode(_$CardTypeEnumMap, json['cardType']),
  fsrsState: FsrsCardState.fromJson(json['fsrsState'] as Map<String, dynamic>),
  createdAt: DateTime.parse(json['createdAt'] as String),
);

Map<String, dynamic> _$ReviewCardToJson(_ReviewCard instance) =>
    <String, dynamic>{
      'id': instance.id,
      'wordId': instance.wordId,
      'front': instance.front,
      'back': instance.back,
      'cardType': _$CardTypeEnumMap[instance.cardType]!,
      'fsrsState': instance.fsrsState.toJson(),
      'createdAt': instance.createdAt.toIso8601String(),
    };

const _$CardTypeEnumMap = {
  CardType.recognition: 'recognition',
  CardType.production: 'production',
  CardType.parsing: 'parsing',
};
