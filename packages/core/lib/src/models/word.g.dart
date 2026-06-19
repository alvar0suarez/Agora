// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'word.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Word _$WordFromJson(Map<String, dynamic> json) => _Word(
  id: json['id'] as String,
  lemma: json['lemma'] as String,
  gloss: json['gloss'] as String,
  pos: $enumDecode(_$PartOfSpeechEnumMap, json['pos']),
  createdAt: DateTime.parse(json['createdAt'] as String),
  form: json['form'] as String?,
  frequency: (json['frequency'] as num?)?.toInt(),
  dccRank: (json['dccRank'] as num?)?.toInt(),
);

Map<String, dynamic> _$WordToJson(_Word instance) => <String, dynamic>{
  'id': instance.id,
  'lemma': instance.lemma,
  'gloss': instance.gloss,
  'pos': _$PartOfSpeechEnumMap[instance.pos]!,
  'createdAt': instance.createdAt.toIso8601String(),
  'form': instance.form,
  'frequency': instance.frequency,
  'dccRank': instance.dccRank,
};

const _$PartOfSpeechEnumMap = {
  PartOfSpeech.noun: 'noun',
  PartOfSpeech.verb: 'verb',
  PartOfSpeech.adjective: 'adjective',
  PartOfSpeech.adverb: 'adverb',
  PartOfSpeech.pronoun: 'pronoun',
  PartOfSpeech.article: 'article',
  PartOfSpeech.preposition: 'preposition',
  PartOfSpeech.conjunction: 'conjunction',
  PartOfSpeech.particle: 'particle',
  PartOfSpeech.numeral: 'numeral',
  PartOfSpeech.interjection: 'interjection',
  PartOfSpeech.other: 'other',
};
