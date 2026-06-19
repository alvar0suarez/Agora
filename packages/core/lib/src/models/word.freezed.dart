// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'word.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Word {

 String get id;/// Dictionary headword in polytonic Greek.
 String get lemma;/// Short meaning / gloss in the learner's language.
 String get gloss;/// Part of speech.
 PartOfSpeech get pos;/// When this entry was added to the user's data.
 DateTime get createdAt;/// Concrete inflected form, if this entry refers to a specific occurrence.
 String? get form;/// Raw corpus frequency count, if known.
 int? get frequency;/// Rank within the Dickinson College Commentaries core vocabulary list.
/// Lower = more frequent. Null if the word is outside the DCC core.
 int? get dccRank;
/// Create a copy of Word
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$WordCopyWith<Word> get copyWith => _$WordCopyWithImpl<Word>(this as Word, _$identity);

  /// Serializes this Word to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Word&&(identical(other.id, id) || other.id == id)&&(identical(other.lemma, lemma) || other.lemma == lemma)&&(identical(other.gloss, gloss) || other.gloss == gloss)&&(identical(other.pos, pos) || other.pos == pos)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.form, form) || other.form == form)&&(identical(other.frequency, frequency) || other.frequency == frequency)&&(identical(other.dccRank, dccRank) || other.dccRank == dccRank));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,lemma,gloss,pos,createdAt,form,frequency,dccRank);

@override
String toString() {
  return 'Word(id: $id, lemma: $lemma, gloss: $gloss, pos: $pos, createdAt: $createdAt, form: $form, frequency: $frequency, dccRank: $dccRank)';
}


}

/// @nodoc
abstract mixin class $WordCopyWith<$Res>  {
  factory $WordCopyWith(Word value, $Res Function(Word) _then) = _$WordCopyWithImpl;
@useResult
$Res call({
 String id, String lemma, String gloss, PartOfSpeech pos, DateTime createdAt, String? form, int? frequency, int? dccRank
});




}
/// @nodoc
class _$WordCopyWithImpl<$Res>
    implements $WordCopyWith<$Res> {
  _$WordCopyWithImpl(this._self, this._then);

  final Word _self;
  final $Res Function(Word) _then;

/// Create a copy of Word
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? lemma = null,Object? gloss = null,Object? pos = null,Object? createdAt = null,Object? form = freezed,Object? frequency = freezed,Object? dccRank = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,lemma: null == lemma ? _self.lemma : lemma // ignore: cast_nullable_to_non_nullable
as String,gloss: null == gloss ? _self.gloss : gloss // ignore: cast_nullable_to_non_nullable
as String,pos: null == pos ? _self.pos : pos // ignore: cast_nullable_to_non_nullable
as PartOfSpeech,createdAt: null == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime,form: freezed == form ? _self.form : form // ignore: cast_nullable_to_non_nullable
as String?,frequency: freezed == frequency ? _self.frequency : frequency // ignore: cast_nullable_to_non_nullable
as int?,dccRank: freezed == dccRank ? _self.dccRank : dccRank // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}

}


/// Adds pattern-matching-related methods to [Word].
extension WordPatterns on Word {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Word value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Word() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Word value)  $default,){
final _that = this;
switch (_that) {
case _Word():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Word value)?  $default,){
final _that = this;
switch (_that) {
case _Word() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String lemma,  String gloss,  PartOfSpeech pos,  DateTime createdAt,  String? form,  int? frequency,  int? dccRank)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Word() when $default != null:
return $default(_that.id,_that.lemma,_that.gloss,_that.pos,_that.createdAt,_that.form,_that.frequency,_that.dccRank);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String lemma,  String gloss,  PartOfSpeech pos,  DateTime createdAt,  String? form,  int? frequency,  int? dccRank)  $default,) {final _that = this;
switch (_that) {
case _Word():
return $default(_that.id,_that.lemma,_that.gloss,_that.pos,_that.createdAt,_that.form,_that.frequency,_that.dccRank);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String lemma,  String gloss,  PartOfSpeech pos,  DateTime createdAt,  String? form,  int? frequency,  int? dccRank)?  $default,) {final _that = this;
switch (_that) {
case _Word() when $default != null:
return $default(_that.id,_that.lemma,_that.gloss,_that.pos,_that.createdAt,_that.form,_that.frequency,_that.dccRank);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Word implements Word {
  const _Word({required this.id, required this.lemma, required this.gloss, required this.pos, required this.createdAt, this.form, this.frequency, this.dccRank});
  factory _Word.fromJson(Map<String, dynamic> json) => _$WordFromJson(json);

@override final  String id;
/// Dictionary headword in polytonic Greek.
@override final  String lemma;
/// Short meaning / gloss in the learner's language.
@override final  String gloss;
/// Part of speech.
@override final  PartOfSpeech pos;
/// When this entry was added to the user's data.
@override final  DateTime createdAt;
/// Concrete inflected form, if this entry refers to a specific occurrence.
@override final  String? form;
/// Raw corpus frequency count, if known.
@override final  int? frequency;
/// Rank within the Dickinson College Commentaries core vocabulary list.
/// Lower = more frequent. Null if the word is outside the DCC core.
@override final  int? dccRank;

/// Create a copy of Word
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$WordCopyWith<_Word> get copyWith => __$WordCopyWithImpl<_Word>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$WordToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Word&&(identical(other.id, id) || other.id == id)&&(identical(other.lemma, lemma) || other.lemma == lemma)&&(identical(other.gloss, gloss) || other.gloss == gloss)&&(identical(other.pos, pos) || other.pos == pos)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.form, form) || other.form == form)&&(identical(other.frequency, frequency) || other.frequency == frequency)&&(identical(other.dccRank, dccRank) || other.dccRank == dccRank));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,lemma,gloss,pos,createdAt,form,frequency,dccRank);

@override
String toString() {
  return 'Word(id: $id, lemma: $lemma, gloss: $gloss, pos: $pos, createdAt: $createdAt, form: $form, frequency: $frequency, dccRank: $dccRank)';
}


}

/// @nodoc
abstract mixin class _$WordCopyWith<$Res> implements $WordCopyWith<$Res> {
  factory _$WordCopyWith(_Word value, $Res Function(_Word) _then) = __$WordCopyWithImpl;
@override @useResult
$Res call({
 String id, String lemma, String gloss, PartOfSpeech pos, DateTime createdAt, String? form, int? frequency, int? dccRank
});




}
/// @nodoc
class __$WordCopyWithImpl<$Res>
    implements _$WordCopyWith<$Res> {
  __$WordCopyWithImpl(this._self, this._then);

  final _Word _self;
  final $Res Function(_Word) _then;

/// Create a copy of Word
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? lemma = null,Object? gloss = null,Object? pos = null,Object? createdAt = null,Object? form = freezed,Object? frequency = freezed,Object? dccRank = freezed,}) {
  return _then(_Word(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,lemma: null == lemma ? _self.lemma : lemma // ignore: cast_nullable_to_non_nullable
as String,gloss: null == gloss ? _self.gloss : gloss // ignore: cast_nullable_to_non_nullable
as String,pos: null == pos ? _self.pos : pos // ignore: cast_nullable_to_non_nullable
as PartOfSpeech,createdAt: null == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime,form: freezed == form ? _self.form : form // ignore: cast_nullable_to_non_nullable
as String?,frequency: freezed == frequency ? _self.frequency : frequency // ignore: cast_nullable_to_non_nullable
as int?,dccRank: freezed == dccRank ? _self.dccRank : dccRank // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}


}

// dart format on
