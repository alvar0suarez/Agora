// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'lesson.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Lesson {

 String get id;/// Sequential unit number in the curriculum (1-based).
 int get unit; String get title;/// Short grammar topic label, e.g. "Presente activo indicativo".
 String get grammarTopic; LessonDifficulty get difficulty;/// Grammar explanation for the unit, as markdown.
 String get content;/// Ids of words introduced by this lesson.
 List<String> get vocabularyWordIds;/// Ids of exercises belonging to this lesson.
 List<String> get exerciseIds;
/// Create a copy of Lesson
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LessonCopyWith<Lesson> get copyWith => _$LessonCopyWithImpl<Lesson>(this as Lesson, _$identity);

  /// Serializes this Lesson to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Lesson&&(identical(other.id, id) || other.id == id)&&(identical(other.unit, unit) || other.unit == unit)&&(identical(other.title, title) || other.title == title)&&(identical(other.grammarTopic, grammarTopic) || other.grammarTopic == grammarTopic)&&(identical(other.difficulty, difficulty) || other.difficulty == difficulty)&&(identical(other.content, content) || other.content == content)&&const DeepCollectionEquality().equals(other.vocabularyWordIds, vocabularyWordIds)&&const DeepCollectionEquality().equals(other.exerciseIds, exerciseIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,unit,title,grammarTopic,difficulty,content,const DeepCollectionEquality().hash(vocabularyWordIds),const DeepCollectionEquality().hash(exerciseIds));

@override
String toString() {
  return 'Lesson(id: $id, unit: $unit, title: $title, grammarTopic: $grammarTopic, difficulty: $difficulty, content: $content, vocabularyWordIds: $vocabularyWordIds, exerciseIds: $exerciseIds)';
}


}

/// @nodoc
abstract mixin class $LessonCopyWith<$Res>  {
  factory $LessonCopyWith(Lesson value, $Res Function(Lesson) _then) = _$LessonCopyWithImpl;
@useResult
$Res call({
 String id, int unit, String title, String grammarTopic, LessonDifficulty difficulty, String content, List<String> vocabularyWordIds, List<String> exerciseIds
});




}
/// @nodoc
class _$LessonCopyWithImpl<$Res>
    implements $LessonCopyWith<$Res> {
  _$LessonCopyWithImpl(this._self, this._then);

  final Lesson _self;
  final $Res Function(Lesson) _then;

/// Create a copy of Lesson
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? unit = null,Object? title = null,Object? grammarTopic = null,Object? difficulty = null,Object? content = null,Object? vocabularyWordIds = null,Object? exerciseIds = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,unit: null == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as int,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,grammarTopic: null == grammarTopic ? _self.grammarTopic : grammarTopic // ignore: cast_nullable_to_non_nullable
as String,difficulty: null == difficulty ? _self.difficulty : difficulty // ignore: cast_nullable_to_non_nullable
as LessonDifficulty,content: null == content ? _self.content : content // ignore: cast_nullable_to_non_nullable
as String,vocabularyWordIds: null == vocabularyWordIds ? _self.vocabularyWordIds : vocabularyWordIds // ignore: cast_nullable_to_non_nullable
as List<String>,exerciseIds: null == exerciseIds ? _self.exerciseIds : exerciseIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}

}


/// Adds pattern-matching-related methods to [Lesson].
extension LessonPatterns on Lesson {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Lesson value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Lesson() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Lesson value)  $default,){
final _that = this;
switch (_that) {
case _Lesson():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Lesson value)?  $default,){
final _that = this;
switch (_that) {
case _Lesson() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  int unit,  String title,  String grammarTopic,  LessonDifficulty difficulty,  String content,  List<String> vocabularyWordIds,  List<String> exerciseIds)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Lesson() when $default != null:
return $default(_that.id,_that.unit,_that.title,_that.grammarTopic,_that.difficulty,_that.content,_that.vocabularyWordIds,_that.exerciseIds);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  int unit,  String title,  String grammarTopic,  LessonDifficulty difficulty,  String content,  List<String> vocabularyWordIds,  List<String> exerciseIds)  $default,) {final _that = this;
switch (_that) {
case _Lesson():
return $default(_that.id,_that.unit,_that.title,_that.grammarTopic,_that.difficulty,_that.content,_that.vocabularyWordIds,_that.exerciseIds);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  int unit,  String title,  String grammarTopic,  LessonDifficulty difficulty,  String content,  List<String> vocabularyWordIds,  List<String> exerciseIds)?  $default,) {final _that = this;
switch (_that) {
case _Lesson() when $default != null:
return $default(_that.id,_that.unit,_that.title,_that.grammarTopic,_that.difficulty,_that.content,_that.vocabularyWordIds,_that.exerciseIds);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Lesson implements Lesson {
  const _Lesson({required this.id, required this.unit, required this.title, required this.grammarTopic, required this.difficulty, required this.content, final  List<String> vocabularyWordIds = const <String>[], final  List<String> exerciseIds = const <String>[]}): _vocabularyWordIds = vocabularyWordIds,_exerciseIds = exerciseIds;
  factory _Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);

@override final  String id;
/// Sequential unit number in the curriculum (1-based).
@override final  int unit;
@override final  String title;
/// Short grammar topic label, e.g. "Presente activo indicativo".
@override final  String grammarTopic;
@override final  LessonDifficulty difficulty;
/// Grammar explanation for the unit, as markdown.
@override final  String content;
/// Ids of words introduced by this lesson.
 final  List<String> _vocabularyWordIds;
/// Ids of words introduced by this lesson.
@override@JsonKey() List<String> get vocabularyWordIds {
  if (_vocabularyWordIds is EqualUnmodifiableListView) return _vocabularyWordIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_vocabularyWordIds);
}

/// Ids of exercises belonging to this lesson.
 final  List<String> _exerciseIds;
/// Ids of exercises belonging to this lesson.
@override@JsonKey() List<String> get exerciseIds {
  if (_exerciseIds is EqualUnmodifiableListView) return _exerciseIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_exerciseIds);
}


/// Create a copy of Lesson
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$LessonCopyWith<_Lesson> get copyWith => __$LessonCopyWithImpl<_Lesson>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$LessonToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Lesson&&(identical(other.id, id) || other.id == id)&&(identical(other.unit, unit) || other.unit == unit)&&(identical(other.title, title) || other.title == title)&&(identical(other.grammarTopic, grammarTopic) || other.grammarTopic == grammarTopic)&&(identical(other.difficulty, difficulty) || other.difficulty == difficulty)&&(identical(other.content, content) || other.content == content)&&const DeepCollectionEquality().equals(other._vocabularyWordIds, _vocabularyWordIds)&&const DeepCollectionEquality().equals(other._exerciseIds, _exerciseIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,unit,title,grammarTopic,difficulty,content,const DeepCollectionEquality().hash(_vocabularyWordIds),const DeepCollectionEquality().hash(_exerciseIds));

@override
String toString() {
  return 'Lesson(id: $id, unit: $unit, title: $title, grammarTopic: $grammarTopic, difficulty: $difficulty, content: $content, vocabularyWordIds: $vocabularyWordIds, exerciseIds: $exerciseIds)';
}


}

/// @nodoc
abstract mixin class _$LessonCopyWith<$Res> implements $LessonCopyWith<$Res> {
  factory _$LessonCopyWith(_Lesson value, $Res Function(_Lesson) _then) = __$LessonCopyWithImpl;
@override @useResult
$Res call({
 String id, int unit, String title, String grammarTopic, LessonDifficulty difficulty, String content, List<String> vocabularyWordIds, List<String> exerciseIds
});




}
/// @nodoc
class __$LessonCopyWithImpl<$Res>
    implements _$LessonCopyWith<$Res> {
  __$LessonCopyWithImpl(this._self, this._then);

  final _Lesson _self;
  final $Res Function(_Lesson) _then;

/// Create a copy of Lesson
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? unit = null,Object? title = null,Object? grammarTopic = null,Object? difficulty = null,Object? content = null,Object? vocabularyWordIds = null,Object? exerciseIds = null,}) {
  return _then(_Lesson(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,unit: null == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as int,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,grammarTopic: null == grammarTopic ? _self.grammarTopic : grammarTopic // ignore: cast_nullable_to_non_nullable
as String,difficulty: null == difficulty ? _self.difficulty : difficulty // ignore: cast_nullable_to_non_nullable
as LessonDifficulty,content: null == content ? _self.content : content // ignore: cast_nullable_to_non_nullable
as String,vocabularyWordIds: null == vocabularyWordIds ? _self._vocabularyWordIds : vocabularyWordIds // ignore: cast_nullable_to_non_nullable
as List<String>,exerciseIds: null == exerciseIds ? _self._exerciseIds : exerciseIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}


}

// dart format on
