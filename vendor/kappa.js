/** Package wrapper and layout.
*/
"use strict";
(function (global, init) { // Universal Module Definition.
	if (typeof define === 'function' && define.amd) {
		define([/* Put dependencies here. */], init); // AMD module.
	} else if (typeof module === 'object' && module.exports) {
		module.exports = init(/* require("dep'), ... */ ); // CommonJS module.
	} else { // Browser or web worker (probably).
		global.k = global.kappa = init(/* global.dep, ... */); // Assumes base is loaded.
	}
})(this, function __init__() {

	var k = { // Library layout. ///////////////////////////////////////////////
		__name__: 'kappa',
		__init__: __init__,
		__dependencies__: { /* 'dep': dep, ... */ },
		__version__: '0.0.1',
	// Namespaces.
		utils: {},
		data: {},
		lexer: {},
		parser: {},
	};

// Continued by all sources concatenated and __epilogue__.js at the end.

k.utils.obj = (function ()
{
	'use strict';
	/*
	* @function Util function used to apply "Inheritance"
	*
	* @param {Object} superType Object to inherit from
	* @param {Object} subType Enhanced Object
	* @returns void
	*/
	var __inherit = function (subType, superType)
	{
		for (var p in superType) {
			if (superType.hasOwnProperty(p)) {
				subType[p] = superType[p];
			}
		}

		function __() {
			this.constructor = subType;
		}
		__.prototype = superType.prototype;
		/* jshint newcap:false */
		subType.prototype = new __();
	};

	/*
	* @function Util function used to define properties in objects, Common to define alias, insteas od using instance.options.property, used instance.property
	* It is VERY IMPORTANT to notice that all propoerties are set and get from a property called options in the context object, unless getter and setter functions are specified
	*
	* @param {Object} ctx Object containing the options. Father object
	* @param {String} propName Name of the property to add/alias
	* @param {Function} options.set Optional function used ot override the default getter
	* @param {Function} options.get Optional function used ot override the default setter
	* @returns void
	*/
	var __defineProperty = function(ctx, propName, options)
	{
		if (!ctx || !propName)
		{
			throw new Error('Invalid property specification. In order to create a property please specify a context and a property name.');
		}

		var propertyOptions = __extend({
			enumerable: true,
			configurable: false,
			'set': function (val) {
				ctx.options[propName] = val;
			},
			'get': function () {
				return ctx.options[propName];
			}
		}, options || {});

		Object.defineProperty(ctx, propName, propertyOptions);
	};

	/*
	* @function Util function to extend an object. This function accepts n arguments and the first one will be the same as the retuned one (the extended)
	* @param {Object} obj object to extend form
	* @returns {Object} The initial object with the added properties form next arguments
	*/
	var __extend = function(obj)
	{
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < args.length; i++) {
			if (args[i]) {
				for (var prop in args[i]) {
					obj[prop] = args[i][prop];
				}
			}
		}
		return obj;
	};

	/*
	* @function Util function to clone OBJECTS by using JSON.parser/stringify (a deep clone)
	* @param {Object} obj object to clone
	* @returns {Object} A copy of the passed in object
	*/
	var __clone = function(obj)
	{
		return JSON.parse(JSON.stringify(obj));
	};

	/*
	* @function Util function to extend an object. This function accepts n arguments and the first one will be the same as the retuned one (the extended)
	* @param {Object} obj object to extend form
	* @returns {Object} A new object with the added properties form next arguments
	*/
	var __extendInNew = function(obj)
	{
		var args = Array.prototype.slice.call(arguments, 1),
			resOjb = __clone(obj);
		for (var i = 0; i < args.length; i++) {
			if (args[i]) {
				for (var prop in args[i]) {
					resOjb[prop] = args[i][prop];
				}
			}
		}
		return resOjb;
	};

	/*
	* @function Util function to determine if an object is or not an array
	* @param {Object} o object to check its type
	* @returns {Boolean} True if the object passed in is an Array or false otherwise
	*/
	var __isArray = function(o)
	{
		return Object.prototype.toString.call(o) === '[object Array]';
	};

	/*
	* @function Util function to determine if an object is or not a String
	* @param {Object} s object to check its type
	* @returns {Boolean} True if the object passed in is a String or false otherwise
	*/
	var __isString = function(s)
	{
		return Object.prototype.toString.call(s) === '[object String]';
	};

	/*
	* @function Util function to determine if an object is or not a Regular Expression
	* @param {Object} s object to check its type
	* @returns {Boolean} True if the object passed in is a Regular Expresion, false otherwise
	*/
	var __isRegExp = function(r)
	{
		return Object.prototype.toString.call(r) === '[object RegExp]';
	};

	/*
	* @function Util function to determine if an object is or not a Number
	* @param {Object} n object to check its type
	* @returns {Boolean} True if the object passed in is a Number, false otherwise
	*/
	var __isNumber = function(n)
	{
		return Object.prototype.toString.call(n) === '[object Number]';
	};

	/*
	* @function Util function to determine if an object is or not a Function
	* @param {Object} f object to check its type
	* @returns {Boolean} True if the object passed in is a Function, false otherwise
	*/
	var __isFunction = function(f)
	{
		return Object.prototype.toString.call(f) === '[object Function]';
	};

	/*
	* @function Util function to determine if an object is or not Boolean
	* @param {Object} b object to check its type
	* @returns {Boolean} True if the object passed in is Boolean, false otherwise
	*/
	var __isBoolean = function(b) {
		return b === true || b === false || Object.prototype.toString.call(b) === '[object Boolean]';
	};

	/*
	* @function Util function to determine if an object is the JS Arguments array, which is of a particular type
	* @param {Object} a object to check its type
	* @returns {Boolean} True if the object passed in is an Arguments Array, false otherwise
	*/
	var __isArguments = function(a)
	{
		return Object.prototype.toString.call(a) === '[object Arguments]';
	};

	if (!__isArguments(arguments)) {
		__isArguments = function(a) {
			return !!(a && __has(a, 'callee'));
		};
	}

	/*
	* @function Util function to determine if an thing is or not a Object
	* @param {Thing} n object to check its type
	* @returns {Boolean} True if the thing passed in is a Object, false otherwise
	*/
	var __isObject = function(obj) {
		return obj === Object(obj) && !__isFunction(obj);
	};

	/*
	* @function Util function to determine if a thing is or not defined
	* @param {Thing} obj object to check its state
	* @returns {Boolean} True if the thing passed in is Undefined, false otherwise
	*/
	var __isUndefined = function(obj) {
		return obj === void 0;
	};

	/*
	====================================================================================================================================
	The next function are copied from underscorejs.org. These function are here because I want to be in control of all the code I manage.
	Besides I like that I my code pass my JSHint rule, which are much more stringer that the onces applied by underscore.js
	*/

	/*General Variables*/
	var breaker = {};
	var ArrayProto	= Array.prototype,
		concat		= ArrayProto.concat,
		push		= ArrayProto.push,
		FuncProto	= Function.prototype;

	var nativeKeys         	= Object.keys,
		nativeForEach      	= ArrayProto.forEach,
		nativeReduce       	= ArrayProto.reduce,
		nativeBind         	= FuncProto.bind,
		nativeFilter    	= ArrayProto.filter,
		nativeSome			= ArrayProto.some,
		nativeEvery			= ArrayProto.every,
		nativeIndexOf		= ArrayProto.indexOf,
		slice				= ArrayProto.slice;

	/* @function Alias of hasOwnProperty just for brevety
	* @param {Object} obj object to check ownership of property
	* @param {String} key Property name to verify
	* @returns {Boolean} True if the object posses that property
	*/
	var __has = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	};

	/* @function Returns the list of own properties of an object
	* @param {Object} obj object from which extract keys
	* @returns {Array} List of string keys of property names of the object passed in
	*/
	var __keys = function(obj) {
		if (!__isObject(obj))
		{
			return [];
		}
		if (nativeKeys)
		{
			return nativeKeys(obj);
		}
		var keys = [];
		for (var key in obj){
			if (__has(obj, key))
			{
				keys.push(key);
			}
		}
		return keys;
	};

	/* @function Iterate over the passed in first parameter calling the iterator with the specified context
	* @param {Object} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj
	* @param {Object} context object from which extract keys
	* @returns {Array} List of string keys of property names of the object passed in
	*/
	var __each = function(obj, iterator, context) {
		if (obj === null)
		{
			return obj;
		}
		var i,
			length;
		if (nativeForEach && obj.forEach === nativeForEach)
		{
			obj.forEach(iterator, context);
		}
		else if (obj.length === +obj.length)
		{
			for (i = 0, length = obj.length; i < length; i++)
			{
				if (iterator.call(context, obj[i], i, obj) === breaker) {
					return;
				}
			}
		}
		else
		{
			var keys = __keys(obj);
			for (i = 0, length = keys.length; i < length; i++)
			{
				if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker){
					return;
				}
			}
		}
		return obj;
	};

	/* @function Iterate over the passed in first parameter and mapping each of its valur according the iteration logic
	* @param {Object} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj
	* @param {Object} context object from which extract keys
	* @returns {Array} List of string keys of property names of the object passed in
	*/
	var __map =  function(obj, iterator, context) {
		var results = [];
		if (obj === null)
		{
			return results;
		}
		__each(obj, function(value, index, list) {
			results.push(iterator.call(context, value, index, list));
		});
		return results;
	};

	var reduceError = 'Reduce of empty array with no initial value';

	/* @function Iterate over the passed in first parameter and group them all into the result by applying the iteralot logic
	* @param {Object} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj
	* @param {Object} memo is the initial state of the reduction
	* @param {Object} context object used to call the iterator
	* @returns {Array} List of string keys of property names of the object passed in
	*/
	var __reduce = function(obj, iterator, memo, context) {
		var initial = arguments.length > 2;
		if (obj === null) {
			obj = [];
		}
		if (nativeReduce && obj.reduce === nativeReduce)
		{
			if (context)
			{
				iterator = __bind(iterator, context);
			}
			return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
		}
		__each(obj, function(value, index, list) {
			if (!initial) {
				memo = value;
				initial = true;
			} else {
				memo = iterator.call(context, memo, value, index, list);
			}
		});
		if (!initial) {
			throw new TypeError(reduceError);
		}
		return memo;
	};

	var Ctor = function(){};

	/* @function Bind a function to an object, meaning that whenever the function is called, the value of this will be the object.
	* Optionally, pass arguments to the function to pre-fill them, also known as partial application
	* @param {Function} func Function to wrap up
	* @param {Object} context Object used as a context in the execution of func
	* @returns {Function} A new wrap function
	*/
	var __bind = function(func, context) {
		var args, bound;
		if (nativeBind && func.bind === nativeBind) {
			return nativeBind.apply(func, slice.call(arguments, 1));
		}
		if (!__isFunction(func)) {
			throw new TypeError();
		}
		args = slice.call(arguments, 2);
		bound = function() {
			if (!(this instanceof bound)) {
				return func.apply(context, args.concat(slice.call(arguments)));
			}
			Ctor.prototype = func.prototype;
			var self = new Ctor();
			Ctor.prototype = null;
			var result = func.apply(self, args.concat(slice.call(arguments)));
			if (Object(result) === result)
			{
				return result;
			}
			return self;
		};
		return bound;
	};

	/* @function Iterate over the passed in first parameter and filter them based on the result of the predicate parameter
	* @param {Object} obj object to traverse
	* @param {Function} predicate function called per each item founded in obj to determine if the item is or no in the final result
	* @param {Object} context object used to call the iterator
	* @returns {Array} List of item in object that return thruly tp the passed in predicate
	*/
	var __filter = function(obj, predicate, context) {
		var results = [];
		if (obj === null) {
			return results;
		}
		if (nativeFilter && obj.filter === nativeFilter) {
			return obj.filter(predicate, context);
		}

		__each(obj, function(value, index, list) {
			if (predicate.call(context, value, index, list))
			{
				results.push(value);
			}
		});
		return results;
	};

	/* @function Keep the identity function around for default iterators.
	* @param {Object} value Value that will returned
	* @returns {Object} The same value that passed in
	*/
	var __identity = function(value) {
		return value;
	};

	/* @function Determine if at least one element in the object matches a truth test
	* @param {Object} obj object to traverse
	* @param {Function} predicate function called per each item founded in obj to determine if the item fullfil the requirements
	* @param {Object} context object used to call the iterator
	* @returns {Boolean} True if at least one item pass the predicate, false otherwise
	*/
	var __any = function(obj, predicate, context) {
		predicate = predicate || __identity;
		var result = false;
		if (obj === null) {
			return result;
		}
		if (nativeSome && obj.some === nativeSome) {
			return obj.some(predicate, context);
		}

		__each(obj, function(value, index, list) {
			if (result || (result = predicate.call(context, value, index, list))) {
				return breaker;
			}
		});
		return !!result;
	};

	/* @function Convenience version of a common use case of map: fetching a property.
	* @param {Object} obj Object to be traverse
	* @param {String} key Name of the property to extract from eacj item in obje
	* @returns {Array} List of each property value from each item in obj
	*/
	var __pluck = function(obj, key) {
		return __map(obj, __property(key));
	};

	/* @function Auxiliar and Internal function used to return an object's propert by settings using a closure the property name.
	* Returns a function that will itself return the key property of any passed-in object
	* @param {String} key Name of the property name to 'lock'
	* @returns {Function} A function that accepts an object and returns the value of its property set before
	*/
	var __property = function(key) {
		return function(obj) {
			return obj[key];
		};
	};

	/* @function An internal function to generate lookup iterators
	* @param {Object} value Lookup
	* @returns {Object} Object lookup
	*/
	var lookupIterator = function (value) {
		if (value === null || value === undefined) {
			return __identity;
		}
		if (__isFunction(value)) {
			return value;
		}
		return __property(value);
	};

	var createCallback = function (func, context, argCount) {
		if (context === void 0)
		{
			return func;
		}
		switch (argCount === null ? 3 : argCount)
		{
			case 1:
				return function (value) {
					return func.call(context, value);
				};
			case 2:
				return function (value, other) {
					return func.call(context, value, other);
				};
			case 3:
				return function (value, index, collection) {
					return func.call(context, value, index, collection);
				};
			case 4:
				return function (accumulator, value, index, collection) {
					return func.call(context, accumulator, value, index, collection);
				};
		}

		return function() {
			return func.apply(context, arguments);
		};
	};

	/* @funciton A mostly-internal function to generate callbacks that can be applied to each element in a collection, returning the desired result — either identity, an arbitrary callback, a property matcher, or a property accessor.
	* @param {Any} value Value to inspect so a matching function ca be created
	* @param {Object} context In the c value parameter is a function, this param will be the context in wich that function will execute
	* @param {Number} argCount Count off argument the function value param will acept assuming it is a function
	* @return {Function} A function that can be used to iterate and match over a collection
	*/
	var __iteratee = function (value, context, argCount) {
		if (value === null || value === undefined)
		{
			return __identity;
		}

		if (__isFunction(value))
		{
			return createCallback(value, context, argCount);
		}

		if (__isObject(value))
		{
			return __matches(value);
		}

		return __property(value);
	};

	/* @function Sort the object’s values by a criterion produced by an iterator.
	* @param {Object} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj. Called with value, index, list
	* @param {Object} context object from which extract keys
	* @returns {Object} The same obj passed in but sorted as specified by the iterator function
	*/
	var __sortBy = function(obj, iterator, context) {
		iterator = lookupIterator(iterator);

		return __pluck(__map(obj, function(value, index, list)
		{
			return {
				value: value,
				index: index,
				criteria: iterator.call(context, value, index, list)
			};
		}).sort(function(left, right) {
			var a = left.criteria;
			var b = right.criteria;
			if (a !== b) {
				if (a > b || a === void 0) {
					return 1;
				}
				if (a < b || b === void 0) {
					return -1;
				}
			}
			return left.index - right.index;
		}), 'value');
	};

	/* @function Return the first value which passes a truth test
	* @param {Object} obj object to traverse
	* @param {Function} predicate function called per each item founded in obj
	* @param {Object} context object from which extract keys
	* @returns {Object} The first item in obj that returns true
	*/
	var __find = function(obj, predicate, context) {
		var result;
		__any(obj, function(value, index, list) {
			if (predicate.call(context, value, index, list)) {
				result = value;
				return true;
			}
		});
		return result;
	};

	/* @function An internal function used for aggregate “group by” operations.
	* @param {Array} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj
	* @param {Object} context object from which extract keys
	* @returns {Object} Object where each property is the key of each group, and where the values of these key are the array of values grouped
	*/
	var group = function(behavior) {
		return function(obj, iterator, context) {
			var result = {};
			iterator = lookupIterator(iterator);
			__each(obj, function(value, index) {
				var key = iterator.call(context, value, index, obj);
				behavior(result, key, value);
			});
			return result;
		};
	};

	/* @function Determine whether all of the elements match a truth test.
	* @param {Array} obj object to traverse
	* @param {Function} predicate function called per each item founded in obj to determine if fulfill the requirements
	* @param {Object} context object from which extract keys
	* @returns {Boolean} Returns true if all of the values in the list pass the predicate truth test.
	*/
	var __every = function(obj, predicate, context) {
		predicate = predicate || __identity;
		var result = true;
		if (obj === null) {
			return result;
		}
		if (nativeEvery && obj.every === nativeEvery) {
			return obj.every(predicate, context);
		}
		__each(obj, function(value, index, list) {
			if (!(result = result && predicate.call(context, value, index, list)))
			{
				return breaker;
			}
		});
		return !!result;
	};

	/* @function Internal implementation of a recursive flatten function.
	* @param {Array} input object to traverse
	* @param {Boolean} shallow Indicate if the flattening should NOT be made recusrively (true: DO NOT make it recursively)
	* @param {Array} output Output parameter wheere the final list is saved
	* @returns {Array} Array where each item if flattened
	*/
	var flatten = function(input, shallow, output) {
		if (shallow && __every(input, __isArray)) {
			return concat.apply(output, input);
		}
		__each(input, function(value) {
			if (__isArray(value) || __isArguments(value)) {
				if (shallow) {
					push.apply(output, value);
				} else {
					flatten(value, shallow, output);
				}
			} else {
				output.push(value);
			}
		});
		return output;
	};

	/* @function Flatten out an array, either recursively (by default), or just one level.
	* @param {Array} array object to traverse
	* @param {Boolean} shallow Indicate if the flattening should NOT be made recusrively (true: DO NOT make it recursively)
	* @returns {Array} Array where each item if flattened
	*/
	var __flatten = function(array, shallow) {
		return flatten(array, shallow, []);
	};

	/* @function Determine if the array or object contains a given value (using ===).
	* @param {Array} obj object to traverse
	* @param {Object} target Object looked for
	* @returns {Boolean} True if the obj contains the value pass in
	*/
	var __contains = function(obj, target) {
		if (obj === null || obj === undefined) {
			return false;
		}
		if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
			return obj.indexOf(target) !== -1;
		}
		return __any(obj, function(value) {
			return value === target;
		});
	};

	/* @function Produce a duplicate-free version of the array. If the array has already been sorted, you have the option of using a faster algorithm.
	* @param {Array} array object to traverse
	* @param {Boolean} isSorted indicate if the array is osrted or not
	* @param {Function} iterator If you want to compute unique items based on a transformation, pass an iterator function
	* @param {Object} context object from which extract keys
	* @returns {Array} Original array without duplicates
	*/
	var __uniq = function(array, isSorted, iterator, context) {
		if (__isFunction(isSorted)) {
			context = iterator;
			iterator = isSorted;
			isSorted = false;
		}
		var initial = iterator ? __map(array, iterator, context) : array,
			results = [],
			seen = [];

		__each(initial, function(value, index) {
			if (isSorted ? (!index || seen[seen.length - 1] !== value) : !__contains(seen, value))
			{
				seen.push(value);
				results.push(array[index]);
			}
		});
		return results;
	};

	/* @function Groups the object’s values by a criterion. Pass either a string attribute to group by, or a function that returns the criterion
	* @param {Array} obj object to traverse
	* @param {Function} iterator function called per each item founded in obj
	* @param {Object} context object from which extract keys
	* @returns {Object} Object where each property is the key of each group, and where the values of these key are the array of values grouped
	*/
	var __groupBy = group(function(result, key, value) {
		if (__has(result, key))
		{
			result[key].push(value);
		} else {
			result[key] = [value];
		}
	});

	/* @function Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order.
	* @param {Array} array List of items to traverse
	* @param {Object} obj object to traverse
	* @param {Function} iterator Optional function that will be used to compute the sort ranking of each value, including the value (obj param) you pass.
		Iterator may also be the string name of the property to sort by
	* @param {Object} context Used as a context when executing the iterator function
	* @returns {Integer} The location/index at which the pass value should be inserted.
	*/
	var __sortedIndex = function(array, obj, iterator, context) {
		iterator = lookupIterator(iterator);
		var value = iterator.call(context, obj);
		var low = 0,
			high = array.length;

		while (low < high) {
			var mid = (low + high) >>> 1;
			if (iterator.call(context, array[mid]) < value)
			{
				low = mid + 1;
			}
			else
			{
				high = mid;
			}
		}
		return low;
	};

	/* @function Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* @param {Array} array List of items to traverse
	* @param {Object} item Object to find into the array
	* @param {Booelan} isSorted When the array is Byed pass true and the algorithm will perform a faster approach
	* @returns {Integer} The location/index at which the pass value is present, and -1 if the value is not present
	*/
	var __indexOf = function (array, item, isSorted) {
		if (array === null) {
			return -1;
		}
		var i = 0, length = array.length;
		if (isSorted) {
			if (typeof isSorted === 'number') {
				i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
			} else {
				i = __sortedIndex(array, item);
				return array[i] === item ? i : -1;
			}
		}

		if (nativeIndexOf && array.indexOf === nativeIndexOf) {
			return array.indexOf(item, isSorted);
		}

		for (; i < length; i++) {
			if (array[i] === item) {
				return i;
			}
		}
		return -1;
	};

	var idCounter = 0;
	/* @function Generate a unique integer id (unique within the entire client session).
	* @param {String} prefix Optional prefix name
	* @returns {String} Unique identifier
	*/
	var __uniqueId = function (prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	};

	/* @function Returns the last element of an array. Passing n will return the last n elements of the array..
	* @param {Integer} n Count of elements to return
	* @returns {[Object] || Object} Array with the last n values if n is specified or just the object of the array
	*/
	var  __last = function (array, n, guard) {
		if (array === null || array === undefined)
		{
			return void 0;
		}
		if (n === null || n === undefined || guard)
		{
			return array[array.length - 1];
		}
		return slice.call(array, Math.max(array.length - n, 0));
	};

	/*
	* @function Util function to shallow clone any kind of object
	* @param {Object} obj object to clone
	* @returns {Object} Shadow copy of the passed in object
	*/
	var __shallowClone = function (obj)
	{
		if (!__isObject(obj))
		{
			return obj;
		}

    	return __isArray(obj) ? obj.slice() : __extend({}, obj);
	};

	/*
	* @function Returns the maximum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. -Infinity is returned if list is empty.
	* @param {Array<Object>|Object} obj Source of iteration to find the maximun value
	* @param {Function|String} iteratee Function that will be passed in each object in obj parameter, or a string indicate the property name to use to detect the max value of each object in the obj parray parameter
	* @param {Object} context Obhect used as a context when executing the iterator function.
	* @returns {Object} The element in the obj param with te maximun value as specified by the iteratee parameter
	*/
	var __max = function (obj, iteratee, context)
	{
		var result = -Infinity,
			lastComputed = -Infinity,
			value,
			computed;

		if ((iteratee === null || iteratee === undefined) && obj !== null)
		{
			obj = obj.length === +obj.length ? obj : __values(obj);

			for (var i = 0, length = obj.length; i < length; i++)
			{
				value = obj[i];
				if (value > result)
				{
					result = value;
				}
			}
		}
		else
		{
			iteratee = __iteratee(iteratee, context);

			__each(obj, function (value, index, list)
			{
				computed = iteratee(value, index, list);

				if (computed > lastComputed || computed === -Infinity && result === -Infinity)
				{
					result = value;
					lastComputed = computed;
				}
			});
		}
		return result;
	};

	/*
	* @function Convert an object into a list of [key, value] pairs.
	* @param {Object} obj Object to convert.
	* @param {Object} context Obhect used as a context when executing the iterator function.
	* @returns {Array<Array<Object>>} Returns an array where each items is a two values array; the first value is the string name of the property and the second if its value.
	*/
	var __pairs = function(obj)
	{
		var keys = __keys(obj),
			length = keys.length,
			pairs = new Array(length);

		for (var i = 0; i < length; i++)
		{
			pairs[i] = [keys[i], obj[keys[i]]];
		}
		return pairs;
	};

	/*
	* @function Returns a predicate function that will tell you if a passed in object contains all of the key/value properties present in attrs.
	* e.g.
	*		var ready = k.utils.obj.matches({selected: true, visible: true});
	*		var readyToGoList = _.filter(list, ready);
	* @param {Object} attrs Object containing the properties and values to match
	* @return {Function} A predicate that return true or false when the passed in parameter match with the original attrs
	*/
	var __matches = function (attrs)
	{
		var pairs = __pairs(attrs),
			length = pairs.length;

		return function(obj)
		{
			if (obj === null)
			{
				return !length;
			}

			obj = new Object(obj);
			for (var i = 0; i < length; i++)
			{
				var pair = pairs[i], key = pair[0];
				if (pair[1] !== obj[key] || !(key in obj))
				{
					return false;
				}
			}
			return true;
		};
	};

	/*
	* @function Return all of the values of the object's properties.
	* @param {Object} obj Object to extract properties' value
	* @return {Array<Object>} Array property values
	*/
	var __values = function(obj)
	{
		var keys = __keys(obj),
			length = keys.length,
			values = new Array(length);

		for (var i = 0; i < length; i++)
		{
			values[i] = obj[keys[i]];
		}
		return values;
	};

	return {
		inherit: __inherit,
		extend: __extend,
		extendInNew: __extendInNew,
		clone: __clone,
		isArray: __isArray,
		isString: __isString,
		isRegExp: __isRegExp,
		isNumber: __isNumber,
		isObject: __isObject,
		isFunction: __isFunction,
		isArguments: __isArguments,
		isBoolean: __isBoolean,
		isUndefined: __isUndefined,
		keys: __keys,
		each: __each,
		map: __map,
		has: __has,
		reduce: __reduce,
		bind: __bind,
		filter: __filter,
		any: __any,
		defineProperty: __defineProperty,
		pluck: __pluck,
		sortBy: __sortBy,
		property: __property,
		find: __find,
		every: __every,
		flatten: __flatten,
		groupBy: __groupBy,
		contains: __contains,
		uniq: __uniq,
		sortedIndex: __sortedIndex,
		indexOf: __indexOf,
		uniqueId: __uniqueId,
		last: __last,
		shallowClone: __shallowClone,
		max: __max,
		pairs: __pairs,
		matches: __matches,
		values: __values
	};
})();

k.utils.str = (function()
{
	'use strict';

	/*
	* @function Util function to determine if an object is or not a String
	* @param {Object} s object to check its type
	* @returns {Boolean} True if the object passed in is a String or false otherwise
	*/
	var __isString = function (s)
	{
		return Object.prototype.toString.call(s) === '[object String]';
	};

	/*
	* @func Util function used to determine if a string starts with anotherone
	*
	* @param {String} source Original string
	* @param {String} input String to check for
	* @returns {Boolean} True if the source starts with input, false otherwise
	*/
	var __startsWith = function(source, input) {
		return source ? String.prototype.slice.call(source, 0, input.length) === input : false;
	};

	/*
	* @func Util function used to remove starting and ending spaces
	*
	* @param {String} str Original string
	* @returns {String} string without initial and final spaces
	*/
	var __trim = function(str) {
		return	str.replace(/^\s+|\s+$/g, '');
	};

	/*
	* @func Util function used to remove starting spaces NOT breaking lines
	*
	* @param {String} str Original string
	* @returns {String} string without initial spaces
	*/
	var __ltrim = function(str) {
		var space = /^[ \f\t\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+/;
		return str.replace(space,'');
	};

	/*
	* @func Util function used to remove starting breaking lines
	*
	* @param {String} str Original string
	* @returns {String} string without initial enters
	*/
	var __ltrimBreaks = function (str)	{
		return str.replace(/^[\n\r]+/,'');
	};

	/*
	* @func Util function used to remove starting spaces. This method DO remove left breaking lines
	*
	* @param {String} str Original string
	* @returns {String} string without initial spaces
	*/
	var __fullLtrim = function (str)
	{
		return str.replace(/^\s+/,'');
	};

	/*
	* @func Util function used to remove ending spaces
	*
	* @param {String} str Original string
	* @returns {String} string without final spaces
	*/
	var __rtrim = function(str) {
		return str.replace(/\s+$/,'');
	};

	/*
	* @func Util function used to remove starting and ending spaces
	*
	* @param {String} str Original string
	* @returns {String} string without initial and final spaces
	*/
	var __fulltrim = function(str){
		return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	};

	/*
	* @func Generates a string that is composed by various tabs
	*
	* @param {String} counter Number of tabs to add
	* @returns {String} string composed by counter tabs
	*/
	var __tabs = function (counter) {
		var result = '';
		for (var i = counter; i--; ) {
			result += '\t';
		}
		return result;
	};

	/*
	* @func Returns an array with all the location of the string searchStr found into str.
	* IMPORTANT: This code is extracted from: http://stackoverflow.com/a/3410557/1000146
	*
	* @param {String} searchStr Pattern to look for
	* @param {String} str String where to search
	* @param {Boolean} caseSensitive Indicate if the search should take into account the characters case or not
	* @returns {[Number]} Array of numbers containng each of the found locations
	*/
	var __getIndicesOf = function (searchStr, str, caseSensitive) {
		var startIndex = 0,
			searchStrLen = searchStr.length,
			index,
			indices = [];

		if (searchStr === '' || !__isString(searchStr) || !__isString(str))
		{
			return [];
		}

		if (!caseSensitive)
		{
			str = str.toLowerCase();
			searchStr = searchStr.toLowerCase();
		}

		while ((index = str.indexOf(searchStr, startIndex)) > -1) {
			indices.push(index);
			startIndex = index + searchStrLen;
		}

		return indices;
	};

	return {
		startsWith: __startsWith,
		trim: __trim,
		ltrim: __ltrim,
		ltrimBreaks:__ltrimBreaks,
		fullLtrim: __fullLtrim,
		rtrim: __rtrim,
		fulltrim: __fulltrim,
		tabs: __tabs,
		getIndicesOf: __getIndicesOf
	};

})();

/* Node
 * @class
 * @classdesc This class reprensent a generic Node class */
k.data.Node = (function () {
	'use strict';
	
	/*
	 * Constructor Generic Node for any kind of graph
	 *
	 * @constructor
	 * @param {[Object]} options.transitions Array of object that initialy compone this node
	 * @param {String} options.name Optioanl node identifiation
	 * @param {[Node]} options.nodes Array of node instances that are children of this current node
	 */
	var node = function (options)
	{
		this.options = options;
		
		k.utils.obj.defineProperty(this, 'transitions');
		k.utils.obj.defineProperty(this, 'nodes');
		k.utils.obj.defineProperty(this, 'name');
		
		k.utils.obj.defineProperty(this, '_id');
		
		this.transitions = options.transitions || [];
		this.nodes = options.nodes || [];
	};
	
	/* @method Returns the string ID of the current state
	 * @returns {String} ID  */
	node.prototype.getIdentity = function()
	{
		if (!this._id) {
			this._id = this._generateIdentity();
		}
		return this._id;
	};
	
	/* @method Generates an ID that identify this node from any other state
	 * @returns {String} Generated ID  */
	node.prototype._generateIdentity = function()
	{
		return this.name || k.utils.obj.uniqueId('node_');
	};
	
	/* @method Add a new transaction into the list of transactions of the current state
	 * @param {Object} transitionValue Object use to make the transition (i.e. symbol), description of the arista (like the name of the transition)
	 * @param {Node} node Destination node (or state) arrived when moving with the specified tranisiotn
	 * @returns {Void}  */
	node.prototype.addTransition = function (transitionValue, node)
	{
		this.transitions.push(this._generateNewTransition(transitionValue, node));
		this.nodes.push(node);
	};
	
	/* @method Function responsible the creation of new transition objects
	 * @param {Object} transitionValue Object use to make the transition, description of the arista (like the name of the transition)
	 * @param {Node} node Destination node (or state) arrived when moving with the specified tranisiotn
	 * @returns {Object} Transition object  */
	node.prototype._generateNewTransition = function (transitionValue, node)
	{
		return {
			transitionValue: transitionValue,
			node: node
		};
	};
	
	/* @method Gets the node identity
	* @returns {String} A formatted string id of the node */
	node.prototype.toString = function ()
	{
		return this.getIdentity();
	};
	
	return node;
})();

/* Enum for any special Symbol
* @readonly
* @enum {String}
*/
var specialSymbol = k.data.specialSymbol = {
	EMPTY: 'EMPTY',
	EOF : 'EOF'
};

/* Enum Terminals Associativity
* @readonly
* @enum {String}
*/
var associativity = k.data.associativity = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT'
};

/* Symbol
* @class
* @classdesc This class represent any simbol in the entire system */
var Symbol = k.data.Symbol = (function () {
	'use strict';

	/*
	* Creates an instance of a Symbol (This class represent non Terminals, Terminals and Special symbols)
	*
	* @constructor
	* @param {String} options.name The name or denatation of the non terminal
	* @param {Boolean} options.isSpecial Determiens if the current symbol is a secial one, like EOF. Default true
	* @param {Rule} options.rule Rule at which this particular instance of a symbol belongs to
	*/
	var symbol = function (options)
	{
		this.options = options;

		k.utils.obj.defineProperty(this, 'name');
		k.utils.obj.defineProperty(this, 'isSpecial');
		k.utils.obj.defineProperty(this, 'rule');

		this.isSpecial = k.utils.obj.isBoolean(options.isSpecial) ? options.isSpecial : true;

		if (!this.name || !k.utils.obj.isString(this.name))
		{
			throw new Error('Invalid initialization values for a symbol, please provide a string name a symbol');
		}
	};

	/* @method Shows the symbol's name
	* @returns {String} this.name */
	symbol.prototype.toString = function() {
		return this.name.toString();
	};

	return symbol;
})();

/* Non Terminal
* @class
* @classdesc Use this class to create new instance of non Termianls */
var NonTerminal = k.data.NonTerminal = (function(_super) {
	'use strict';

	/* jshint latedef:false */
	k.utils.obj.inherit(nonTerminal, _super);

	/*
	* Creates an instance of a new Non Termianl
	*
	* @constructor
	* @param {String} options.name The name or denatation of the non terminal
	*/
	function nonTerminal (options)
	{
		_super.apply(this, arguments);

		k.utils.obj.defineProperty(this, 'isNullable'); // Control if the current non-terminal is nullable or not, This valus is calculate by the grammar's constructor

		this.isNullable = false;
		this.isSpecial = false;
	}

	/* @method Creates an array os non terminals from a string that represen them
	 * @param {[Array]} arr Array of string used to create new non terminals
	 * @returns {[NonTerminal]} An array of new nonterminals  */
	nonTerminal.fromArray = function (arr)
	{
		if (!k.utils.obj.isArray(arr) && !k.utils.obj.isString(arr)) {
			throw new Error('Invalid parameter. To create non terminal from array the input parameter should be an array!');
		}
		var result = [];
		k.utils.obj.each(arr, function(nonTerminalName)
		{
			result[result.length] = new NonTerminal({name: nonTerminalName});
		});

		return result;
	};

	return nonTerminal;
})(Symbol);

/* Terminal
* @class
* @classdesc Use this class to repsent Termianls (like 'a', 'B', 'Hola', etc.) */
var Terminal = k.data.Terminal = (function(_super) {
	'use strict';

	/* jshint latedef:false */
	k.utils.obj.inherit(terminal, _super);

	/*
	* Creates an instance of a new Termianl
	*
	* @constructor
	* @param {String} options.name The name or denatation of the terminal
	* @param {String|RegExp} options.body The string or regexp used to match the input tokens
	* @param {Number} options.priority Number used by the lexer when more than one terminal fulfill the input-stream, to determine which should be choose. Higher priority are choosen over low priority Defualt Value: 0
	*/
	function terminal (options)
	{
		if (!k.utils.obj.isString(options.body) && !k.utils.obj.isRegExp(options.body)) {
			throw new Error('Invalid Terminal Initialization. A string or regexp body must be specified');
		}
		options.name = options.name ? options.name : options.body.toString();

		_super.apply(this, arguments);

		k.utils.obj.defineProperty(this, 'body');
		k.utils.obj.defineProperty(this, 'isTerminal');
		k.utils.obj.defineProperty(this, 'assoc');
		k.utils.obj.defineProperty(this, 'priority');

		this.priority = this.priority || 0;
		this.isSpecial = false;
		this.isTerminal = true;
	}

	/* @method Shows the terminal's name between < and >
	* @returns {String} Fromatted string */
	terminal.prototype.toString = function()
	{
		return '<' + this.name + '>';
	};

	return terminal;
})(Symbol);

/* Grammatical Rules
* @class
* @classdesc Use this class to create new instance of non Termianls */
var Rule = k.data.Rule = (function() {
	'use strict';

	/*
	* Initialize a new Grammatical Rule
	*
	* @constructor
	* @param {NonTerminal} options.head The name or denatation of the non terminal
	* @param {[Terminal|NonTerminal]} options.tail Array of terminals and nonTerminals that represent the tail of the rule. If is not present an empty tail will be created.
	* @param {Function} options.reduceFunc A function to be executed when reducint this rule
	* @param {String} options.name Identification of the rule instance
	* @param {Number} options.precendence Optional number that indicate the precedence of the current rule
	*/
	var rule = function (options)
	{
		this.options = options;

		if (!options.head)
		{
			throw new Error('Invalid initialization values, please provide a head for the rule');
		}

		//Define alias for:
		k.utils.obj.defineProperty(this, 'head');
		k.utils.obj.defineProperty(this, 'tail');
		k.utils.obj.defineProperty(this, 'reduceFunc');
		k.utils.obj.defineProperty(this, 'name');
		k.utils.obj.defineProperty(this, 'precendence');

		k.utils.obj.defineProperty(this, 'index');
		k.utils.obj.defineProperty(this, 'isProductive'); //Determine if the rule be active part of the grammar. This is calculate by the grammar itself
		k.utils.obj.defineProperty(this, 'isReachable'); //Determine if the rule is reachabke form the start symbol of the grammar. This is calculate by the grammar itself
		k.utils.obj.defineProperty(this, 'terminalsCount'); //Contains the number of terminals in the tail of the current rule

		this.index = -1;
		this.isProductive = false;
		this.isReachable = false;
		this.terminalsCount = 0;

		this.head = !(options.head instanceof NonTerminal) ?
			new NonTerminal({
				name: options.head.toString()
			}) :
			options.head;

		this.tail = (options.tail && k.utils.obj.isArray(options.tail)) ? options.tail : [new Symbol({name: specialSymbol.EMPTY, isSpecial: true})];

		k.utils.obj.each(this.tail, function (symbol)
		{
			if (symbol instanceof Terminal)
			{
				this.terminalsCount++;
			}
			// symbol.rule = this;
		}, this);
	};

	/* @method Convert a Rule to its pritty string representation
	* @returns {String} Formatted string */
	rule.prototype.toString = function()
	{
		return this.head.toString() + ' --> ' + this.tail.join(' ');
	};

	return rule;
})();

/* Grammar
* @class
* @classdesc This class is used to represent grammars */
var Grammar = k.data.Grammar = (function () {
	'use strict';

	var defaultOptions = {
		name: ''
	};

	/*
	* Initialize a new Grammar
	*
	* @constructor
	* @param {NonTerminal} options.startSymbol Start symbol of the grammar
	* @param {[Rule]} options.rules Array of grammatical rules
	* @param {Boolean} options.preserveNonProductiveRules Determine if non-productive rules should be preserve or not. Default: false
	* @param {Boolean} options.preserveUnReachableRules Determine if unreachable rules should be preserve or not. Default: false
	* @param {String} options.name Optional name of the grammar
	*/
	var grammar = function (options)
	{
		this.options = k.utils.obj.extendInNew(defaultOptions, options || {});

		//Define alias for:
		k.utils.obj.defineProperty(this, 'startSymbol');
		k.utils.obj.defineProperty(this, 'name');
		k.utils.obj.defineProperty(this, 'rules');
		k.utils.obj.defineProperty(this, 'preserveNonProductiveRules');
		k.utils.obj.defineProperty(this, 'preserveUnReachableRules');

		k.utils.obj.defineProperty(this, 'specifiedStartSymbol'); //After augmented the grammar this property save the specified start symbol (it should be read only)
		k.utils.obj.defineProperty(this, 'terminals');
		k.utils.obj.defineProperty(this, 'rulesByHeader');
		k.utils.obj.defineProperty(this, 'firstSetsByHeader');
		k.utils.obj.defineProperty(this, 'nullableNonTerminals');

		if (!(this.startSymbol instanceof Symbol))
		{
			throw new Error('Invalid grammar creation, please specify a start Symbol!');
		}

		this.nullableNonTerminals = [];
		this._generateRequireRequisites();
	};

	grammar.constants = {
		AugmentedRuleName: 'AUGMENTRULE'
	};

	/* @method Determines if a rule is productive or not based on the CURRENT state of all the rest of the rules in the grammar
	* @param {Rule} rule Rule that will be analized
	* @returns {Boolean} True if the rule is productive, false otherwise */
	grammar.prototype._isRuleProductive = function (rule)
	{
		//find NONProductive tail symbols
		return !k.utils.obj.find(rule.tail, function (symbol)
		{
			// the tail symnol is a non terminal, that; has rules and its rule are all invalid, OR not have any rule
			if (symbol instanceof NonTerminal &&
				(
					(this.rulesByHeader[symbol.name] && k.utils.obj.every(this.rulesByHeader[symbol.name], function (rule) { return !rule.isProductive; } ) ) ||
					(!this.rulesByHeader[symbol.name])
				)
				)
			{
				return true;
			}
			return false;
		}, this);
	};

	/* @method Generate require state for a grammar.
	* Set rule index
	* Augment the grammar to detect when a string is accepts by adding S' --> S#
	* Calculate rules by head
	* @returns {Void} */
	grammar.prototype._generateRequireRequisites = function ()
	{
		// augment the grammar
	   var augmentedRule = this._augmentGrammar(this.startSymbol, this.startSymbol);

		//set rules index
		k.utils.obj.each(this.rules, function (rule, i) {
			rule.index = i;
		});


		// index rule by its rule's head name
		this._indexRulesByHead();


		// determine which rules are productive and remove unproductive ones
		augmentedRule = this._cleanUnProductiveRules() || augmentedRule;
		this._indexRulesByHead();


		//Remove unreachabel rules
		this._cleanUnReachableRules(augmentedRule);
		this._indexRulesByHead();


		// remove middle tail epsilons
		this._removeMiddleTailEpsilons();


		//Determines nullable non-terminals
		this._determineNullableNonTerminals();


		// get all terminals & determine if it has empty rules
		this.terminals = this._generateListOfTerminals();


		//Pre-Calculate First Sets
		this.firstSetsByHeader = this._precalculateFirstTerminals();
	};

	/* @method Index all the current rules in the rulesByHeader local property
	* @returns {Void} It does not return anything as the values are stored in this.rulesByHeader. */
	grammar.prototype._indexRulesByHead = function ()
	{
		this.rulesByHeader = k.utils.obj.groupBy(this.rules, function (rule)
		{
			return rule.head.name;
		});
	};

	/* @method Calculate the first set for all non-terminals of the current grammar
	* @returns {Object} Object when each property is a non-terminal name and its values are the first sets. */
	grammar.prototype._precalculateFirstTerminals = function ()
	{
		var result = {};

		k.utils.obj.each(k.utils.obj.keys(this.rulesByHeader), function (ruleHead)
		{
			result[ruleHead] = this._calculateFirstSetForHead(ruleHead);
		}, this);

		return result;
	};

	/* @method Calculate the first set for specific non-terminal symbol
	* @param {String} head Name of the head rule to which the First Set will be determined
	* @param {[String]} recursionStack Internal recursion array used to control infinite loops
	* @returns {[Terminals]} Array of terminals (possibly plus EMPTY - the special symbol) FIRST SET */
	grammar.prototype._calculateFirstSetForHead = function (head, recursionStack)
	{
		/*
		This method has as a preconditions:
		-All duplicated epsilon have already being removed
		-Unreachabel rules have been removed
		-Nullable non terminals detected
		-The rulesByHeader object
		*/

		var result = [];

		recursionStack = recursionStack || {};

		k.utils.obj.each(this.rulesByHeader[head], function(rule) {

			k.utils.obj.find(rule.tail, function (symbol)
			{
				if (symbol instanceof NonTerminal)
				{
					if (recursionStack[symbol.name])
					{
						//When we found a recursive (or just a symbol that apear more than one in a same rule or in different rules of the same symbol head) symbol (non-terminal) we SKIP IT (continue with the next item in the tail) IF it is NULLABLE,
						//otherwise if it is NOT NULLABLE we STOP our SEARCH of first item as the current rule will not generate the desire first items (because we are in a recursive case)
						return !symbol.isNullable;
					}

					recursionStack[symbol.name] = true;
				}
				else if (symbol.isSpecial && symbol.name === specialSymbol.EOF)
				{
					return true; //finish the search of terminal first symbols for the current rule
				}

				if (symbol instanceof Terminal || (symbol.name === specialSymbol.EMPTY && symbol.isSpecial))
				{
					result.push(symbol);
				}
				else if (symbol instanceof NonTerminal)
				{
					result = result.concat(k.utils.obj.flatten(this._calculateFirstSetForHead(symbol.name, recursionStack), true));
				}
				else
				{
					throw new Error('Impossible to calculate FIRST Set, some rules have invalid tail symbols');
				}

				//Continue adding items to the FIRST Set if the current result contains EMPTY
				return !k.utils.obj.find(result, function (possible_empty_symbol)
				{
					return possible_empty_symbol.name === specialSymbol.EMPTY;
				});

			}, this);

		}, this);

		return k.utils.obj.uniq(result, false, function (item) {return item.name;});
	};

	/* @method Augments the current grammar by adding a new initial production of the form S' -> S #
	* @returns {Rule} The new generated rule */
	grammar.prototype._augmentGrammar = function (newSubStartSymbol, oldStartSymbol)
	{
		this.specifiedStartSymbol = oldStartSymbol;
		var augmentedRule = new Rule({
			head: 'S\'',
			tail: [newSubStartSymbol, new k.data.Symbol({name: specialSymbol.EOF, isSpecial: true})],
			name: grammar.constants.AugmentedRuleName
		});

		this.rules.unshift(augmentedRule);
		this.startSymbol = augmentedRule.head;

		return augmentedRule;
	};

	/* @method Determiens which rules are non-productive and remove them based on the current options
	* @returns {Rule} In case the affter applying this cleaning process all rule are removed, a new augmented rule is generated and returned */
	grammar.prototype._cleanUnProductiveRules = function ()
	{
		//Remove "Don't make functions within a loop" warning
		/*jshint -W083 */
		var areChanges = false,
			ruleIndex = 0,
			augmentedRule;

		do {
			areChanges = false;
			k.utils.obj.each(this.rules, function (rule)
			{
				if (!rule.isProductive)
				{
					rule.isProductive = this._isRuleProductive(rule);
					areChanges = areChanges || rule.isProductive;
				}
			}, this);
		} while (areChanges);

		if (!this.preserveNonProductiveRules)
		{
			while (ruleIndex < this.rules.length)
			{
				if (!this.rules[ruleIndex].isProductive) {
					this.rules.splice(ruleIndex, 1);
				} else {
					ruleIndex++;
				}
			}

			if (this.rules.length === 0)
			{
				//In this case the augmentation rule does not have a tail! S' --> <EMPTY> EOF
				augmentedRule = this._augmentGrammar(new k.data.Symbol({name: specialSymbol.EMPTY, isSpecial: true}), this.specifiedStartSymbol);
				augmentedRule.index = 0;
			}
		}

		return augmentedRule;
	};

	/* @method Removes each epsilon located in the middle of a rule's tail, as they no add any value but make more complicated the rest of the parser
	* @returns {Void} */
	grammar.prototype._removeMiddleTailEpsilons = function ()
	{
		var tailIndex = 0;
		k.utils.obj.each(this.rules, function (rule)
		{
			tailIndex = 0;

			while (tailIndex < rule.tail.length)
			{
				// if the current tail symbol is an empty one
				if (rule.tail[tailIndex].isSpecial && rule.tail[tailIndex].name === k.data.specialSymbol.EMPTY)
				{
					//if it is not the last one or the previous one is not empty
					if ( ((tailIndex + 1) < rule.tail.length && (!rule.tail[tailIndex + 1].isSpecial || rule.tail[tailIndex + 1].name !== specialSymbol.EOF)) ||
						(tailIndex === (rule.tail.length -1) && tailIndex > 0 && !rule.tail[tailIndex-1].isSpecial) )
					{
						rule.tail.splice(tailIndex, 1);
						--tailIndex;
					}
				}
				tailIndex++;
			}
		});
	};

	/* @method Determine which rules are unreachable and based on the current options remove this rules
	* @param {Rule} augmentedRule The extra added new initial rule
	* @returns {Void} */
	grammar.prototype._cleanUnReachableRules = function (augmentedRule)
	{
		//Remove "Don't make functions within a loop" warning
		/*jshint -W083 */
		var areChanges = false,
			ruleIndex = 0;

		augmentedRule.isReachable = true;
		do
		{
			areChanges = false;
			k.utils.obj.each(this.rules, function (rule)
			{
				if (rule.isReachable)
				{
					k.utils.obj.each(rule.tail, function (symbol)
					{
						if (symbol instanceof NonTerminal)
						{
							k.utils.obj.each(this.rulesByHeader[symbol.name], function (rule)
							{
								if (!rule.isReachable)
								{
									areChanges = true;
									rule.isReachable = true;
								}
							});
						}
					}, this);
				}
			}, this);
		} while (areChanges);

		if (!this.preserveUnReachableRules)
		{
			ruleIndex = 0;
			while (ruleIndex < this.rules.length)
			{
				if (!this.rules[ruleIndex].isReachable) {
					this.rules.splice(ruleIndex, 1);
				} else {
					ruleIndex++;
				}
			}
		}
	};

	/* @method Generate a list of all the terminals the current grammar has. This list is used by the Lexer
	* @returns {[Terminal]} An array of all uniq terminals in the current grammar  */
	grammar.prototype._generateListOfTerminals = function ()
	{
		var tailSymbols = k.utils.obj.flatten(
				k.utils.obj.map(this.rules, function (rule)
				{
					return rule.tail;
				}),
				false);

		// remove duplicated symbol (by its name) and filter all non terminals
		return k.utils.obj.filter(
			k.utils.obj.uniq(tailSymbols, false, function (symbol)
			{
				return symbol.name;
			}),
			function (symbol)
			{
				return symbol.isTerminal;
			});
	};

	/* @method Mark all non-terminales that are nullable with a flag isNullable set in true
	* @returns {Void} */
	grammar.prototype._determineNullableNonTerminals = function ()
	{
		//Remove "Don't make functions within a loop" warning
		/*jshint -W083 */
		var allNonTerminalAreNullablesInRule = false,
			areChanges = false;

		do {
			areChanges = false;

			k.utils.obj.each(this.rules, function (rule)
			{
				if (rule.tail.length === 1 && rule.tail[0].name === k.data.specialSymbol.EMPTY && !rule.head.isNullable)
				{
					rule.head.isNullable = true;
					areChanges = true;
					this.nullableNonTerminals.push(rule.head.name);
				}
				else if (rule.terminalsCount === 0)
				{
					allNonTerminalAreNullablesInRule = k.utils.obj.every(rule.tail, function (nonTerminal)
					{
						return this.nullableNonTerminals.indexOf(nonTerminal.name) >= 0;
					}, this);

					if (allNonTerminalAreNullablesInRule && !rule.head.isNullable)
					{
						rule.head.isNullable = true;
						areChanges = true;
						this.nullableNonTerminals.push(rule.head.name);
					}
				}
			}, this);
		} while (areChanges);

		var allRulesSymbols = k.utils.obj.flatten(
				k.utils.obj.map(this.rules, function (rule)
				{
					return rule.tail.concat(rule.head);
				}),
				false);

		// Mark all non terminals that were determined in the previous step, as nullables. This is require because besides share the same name, each non-temrinal in diferentes rules are different isntances
		var allNullablesNonTerminals = k.utils.obj.filter(allRulesSymbols, function (symbol) {
		   return symbol instanceof NonTerminal && this.nullableNonTerminals.indexOf(symbol.name) >= 0;
		}, this);

		k.utils.obj.each(allNullablesNonTerminals, function(nonTerminal) {
			nonTerminal.isNullable = true;
		});
	};

	/* @method Returns the list of rules that start with the specified symbols as the head
	* @param {Symbol} symbol Symbol used as the head of the requested rules
	* @returns {[Rules]} Array of rules */
	grammar.prototype.getRulesFromNonTerminal = function(symbol)
	{
		return this.rulesByHeader[symbol.name];
	};

	/* @method Convert a Grammar to its pritty string representation
	* @returns {String} Formatted string */
	grammar.prototype.toString = function()
	{
		var strResult = this.name ? 'Name: ' + this.name + '\n' : '';
		strResult += 'Start Symbol: ' + this.startSymbol.name +'\n';

		strResult += k.utils.obj.reduce(k.utils.obj.sortBy(this.rules, function(rule) {return rule.index;}), function (strAcc, rule) {
			return strAcc + '\n' + rule.index + '. ' + rule.toString();
		}, '');

		return strResult;
	};

	return grammar;
})();
/* ASTNode
 * @class
 * @classdesc This class reprensent an AST NODE, a sub-type of a generic Node */
k.data.ASTNode = (function(_super) {
	'use strict';
	
	/* jshint latedef:false */
	k.utils.obj.inherit(astNode, _super);
	
	/*
	 * Constructor AST Node
	 *
	 * @constructor
	 * @param {Rule} options.rule Asociated reduce rule that originate the node creation
	 * @param {String} options.stringValue Optional string chunk that originate the node creation
	 * @param {Symbol} options.symbol Optional Symbol. Used ad the head of the rule that is related with the current ASTNode
	 * @param {[Object]} options.transitions Array of object that initialy compone this node
	 * @param {[Node]} options.nodes Array of Nodes instances (or just objects) that are children of this Node
	 */
	function astNode (options)
	{
		_super.apply(this, arguments);

		k.utils.obj.defineProperty(this, 'rule');
		k.utils.obj.defineProperty(this, 'stringValue');
		k.utils.obj.defineProperty(this, 'currentValue');
		k.utils.obj.defineProperty(this, 'symbol');
	}

	/* @method Generates a string representation of the current AST Node
	 * @param {Boolean} options.deep True in case to print the entire node and its children
	 * @returns {String} formatted string */
	astNode.prototype.toString = function(options)
	{
		if (options && !k.utils.obj.isUndefined(options.deep))
		{
			options.deep = k.utils.obj.isNumber(options.deep) ? options.deep : 0;
			var tabs = k.utils.str.tabs(options.deep);
			++options.deep;
			
			return tabs + this._toCurrentString() + '\n' + k.utils.obj.reduce(this.nodes, function (acc, node) {
				return acc + (k.utils.obj.isString(node) ? k.utils.str.tabs(options.deep) + node + '\n' : node.toString({deep: options.deep}));
			},'');
		} 
		
		return this._toCurrentString();
	};
	
	/* @method Generates a string representation of the current AST Node
	 * @returns {String} formatted string */
	astNode.prototype._toCurrentString = function ()
	{
		return this.getIdentity() + (this.rule ? ': '+ this.rule.toString() + ' (' + this.currentValue + ')' : '');
	};
	
	return astNode;
})(k.data.Node);
/* Item Rule
* @class
* @classdesc This class represent an Item. A rule being processed. Generally a dot is used to represent which part have already been
processed. Ex. S ==> aB*AB */
var ItemRule = k.data.ItemRule = (function() {
	'use strict';
	
	var defaultCloneOptions = {
		dotLocationIncrement: 0
	};

	/*
	* Constructor for a Item Rule
	*
	* @constructor
	* @param {Rule} options.rule Rule wich is pointed be this item
	* @param {Integer} options.dotLocation Index at the tail of the rule that have already been processed
	*/
	var itemRule = function(options)
	{
		this.options = options;

		//Define alias for the next properties
		k.utils.obj.defineProperty(this, 'rule');
		k.utils.obj.defineProperty(this, 'dotLocation');
		k.utils.obj.defineProperty(this, 'lookAhead');
		
		k.utils.obj.defineProperty(this, '_id');

		this.lookAhead = this.lookAhead || [];
		this.dotLocation = options.dotLocation || 0;
		
		if (this.rule && this.rule.tail.length === 1 && this.rule.tail[0].name === k.data.specialSymbol.EMPTY)
		{
			//Empty rules are reduce items
			this.dotLocation = 1;
		}
	};

	/* @method Convert the current item rule to its string representation
	* @returns {String} formatted string */
	itemRule.prototype.toString = function()
	{
		var aux = this.getIdentity() + '.  ' + this.rule.head.name +'-->';
		for (var i = 0; i < this.rule.tail.length; i++)
		{
			aux += (this.dotLocation === i ? '*': ' ') + this.rule.tail[i].toString();
		}
		if (this.dotLocation === i) {
			aux += '*';
		}
		aux += ',    [' + this.lookAhead.join(', ') + ']';
		return aux;
	};

	/* @method Clone the current item, altering its state by the params specified in cloneUpdateOptions
	* @param {Integer} cloneUpdateOptions.dotLocationIncrement Increment that will be applied into the dot location of the new item. Default: 0
	* @param {Object} creationOptions Optional object use to expand current option used to create the returned clone
	* @returns {ItemRule} A clean new item */
	itemRule.prototype.clone = function(cloneUpdateOptions, creationOptions)
	{
		var updateOptions = k.utils.obj.extendInNew(defaultCloneOptions, cloneUpdateOptions || {}),
			cloneOptions = this._cloneCurrentOptions(cloneUpdateOptions, creationOptions);

		var result = new ItemRule(cloneOptions);
		result._incrementDotLocation(updateOptions.dotLocationIncrement);
		result._id = null;

		return result;
	};

	/* @method Clone the current item's options
	* @param {Object} cloneUpdateOptions Optional object use to control the way the options are being cloned
	* @param {Object} extendedOptions Optional object use to expand current options and create the returned clone
	* @returns {Object} A copy of the current options (The referenced rule is not copied, hte same rule instance is used) */
	itemRule.prototype._cloneCurrentOptions = function(cloneUpdateOptions, extendedOptions)
	{
		var ruleAux = this.rule,
			lookAheadAux = this.lookAhead;
			
		this.rule = this.lookAhead = null;
		
		var result = k.utils.obj.extendInNew(this.options, extendedOptions || {});
		
		this.rule = result.rule = ruleAux;
		this.lookAhead = lookAheadAux;
		result.lookAhead = [].concat(lookAheadAux);

		return result;
	};

	/* @method Increase the dot location by the number specified by parameter
	* @param {Integer} increment Increment that will be applied into the dot location of the new item. Default: 1
	* @returns {Void} */
	itemRule.prototype._incrementDotLocation = function(increment)
	{
		var optionsValue = k.utils.obj.isNumber(this.options.dotLocation) ? this.options.dotLocation : 0,
			incrementValue = k.utils.obj.isNumber(increment) ? increment : 1;

		this.dotLocation = optionsValue + incrementValue;
	};
	
	/* @method Gets a string id that uniquely identity the current item rule
	* @returns {String} Id */
	itemRule.prototype.getIdentity = function ()
	{
		if (!this._id)
		{
			this._id = this._generateIdentity();
		}
		return this._id;
	};
	
	/* @method Internal method to generate a unique Id
	* @returns {String} Id */
	itemRule.prototype._generateIdentity = function ()
	{
		return this.rule.index + '(' + this.dotLocation + ')';
	};

	/* @method Returns the right next symbol to the dot location
	* @returns {Symbol} Next symbol or null if there is not next symbol */
	itemRule.prototype.getCurrentSymbol = function ()
	{
		// When the dot location is the same as tail length is a reduce item.
		// In this case the next item is null
		return this.dotLocation < (this.rule.tail.length + 1) ? this.rule.tail[this.dotLocation] : null;
	};
	
	/* @method Determines if the current item rule is a reduce one or not
	* @returns {Boolean} True if the current item is a reduce item, false otherwise */
	itemRule.prototype.isReduce = function ()
	{
		return this.dotLocation === this.rule.tail.length;
	};

	/* @method Create an array of item rules from an array of rules
	* @param {[Rule]} rules Array of rules used to create the item rules. Each new item rule will have 0 as dot location
	* @param {[Symbol]} lookAhead Array of symbols that will be set to each of the item rules created as its lookahead array
	* @returns {[ItemRule]} Array of new Item Rules */
	itemRule.newFromRules = function(rules, lookAhead)
	{
		return k.utils.obj.reduce(rules, function (acc, rule)
		{
			acc.push(new ItemRule({
				rule: rule,
				dotLocation: 0,
				lookAhead: [].concat(lookAhead || [])
			}));
			return acc;
		}, []);
	};

	return itemRule;
})();

/* StackItem
* @class
* @classdesc Each instance of this class will be used by the parse to represent a state into the stack */
k.data.StackItem = (function() {
	'use strict';
	/*
	* Creates an instance of a Parser 
	*
	* @constructor
	* @param {Object} options.state (Require) The current state
	* @param {Object} options.currentValue The Optional result of getting this stack Item. This property is used by the grammar creator to make on-going processing of the being build AST.
	* @param {Symbol} options.stringValue In case that this stack item is created by a TERMINAL reduction or shift, the associated string that generate the stack item creation is attached.
	* @param {Symbol} options.symbol The Optional Current Symbol of the stack item
	* @param {Automata} options.AST Optional underprocessing AST. The Sub-tree AST for the current node
	*/
	var stackItem = function(options) {
		this.options = options;

		k.utils.obj.defineProperty(this, 'state');
		k.utils.obj.defineProperty(this, 'currentValue');
		k.utils.obj.defineProperty(this, 'stringValue');
		k.utils.obj.defineProperty(this, 'symbol');
		k.utils.obj.defineProperty(this, 'AST');
		
		if (!this.state) {
			throw new Error('Invalid initialization values for a Stack Item, please provide a valid state');
		}
	};
	
	return stackItem;
})();

/* State
 * @class
 * @classdesc This class reprensent an automata state, a sub-type of a generic Node */
k.data.State = (function(_super)
{
	'use strict';
	/* jshint latedef:false */
	k.utils.obj.inherit(state, _super);

	/*
	 * Constructor Automata State
	 *
	 * @constructor
	 * @param {[ItemRule]} options.items Array of item rules that initialy compone this state
	 * @param {[Object]} options.transitions Array of object that initialy compone this node
	 * @param {[Node]} options.nodes Array of State instances that are children of this State
	 */
	function state (options) {

		_super.apply(this, arguments);

		k.utils.obj.defineProperty(this, 'isAcceptanceState'); // This is set by the automata generator

		k.utils.obj.defineProperty(this, '_items');
		k.utils.obj.defineProperty(this, '_registerItems');
		k.utils.obj.defineProperty(this, '_condencedView');
		k.utils.obj.defineProperty(this, '_unprocessedItems');

		this.isAcceptanceState = false;

		this._items = options.items || [];
		this._unprocessedItems = this._items.length ? k.utils.obj.shallowClone(this._items) : [];
		options.items = null;

		this._registerItems = {};

		this._registerItemRules();
	}

	/* @method REgister the list of item rules of the current stateso they are assesible by its id
	 * @returns {Void} */
	state.prototype._registerItemRules = function ()
	{
		k.utils.obj.each(this._items, function (itemRule)
		{
			this._registerItems[itemRule.getIdentity()] = itemRule;
		}, this);
	};

	state.constants = {
		AcceptanceStateName: 'AcceptanceState'
	};

	/* @method Get the next unprocessed item rule
	 * @returns {ItemRule} Next Item Rule */
	state.prototype.getNextItem = function() {
		return this._unprocessedItems.splice(0,1)[0];
	};

	/* @method Adds an array of item rule into the state. Only the rules that are not already present in the state will be added
	 * @param {[ItemRule]} itemRules Array of item rules to add into the state
	 * @param {Boolean} options.notMergeLookAhead If specified as true does not marge the lookAhead of the already existing items. Default: falsy
	 * @returns {void} Nothing */
	state.prototype.addItems = function(itemRules, options) {

		this._id = null;
		k.utils.obj.each(itemRules, function (itemRule)
		{
			// The same item rule can be added more than once if the grammar has loops.
			// For sample: (1)S -> A *EXPS B      (2)EXPS -> *EXPS
			if (!this._registerItems[itemRule.getIdentity()])
			{
				this._registerItems[itemRule.getIdentity()] = itemRule;
				this._items.push(itemRule);
				this._unprocessedItems.push(itemRule);
			}
			else if (!options || !options.notMergeLookAhead)
			{
				//As a way of generating a LALR(1) automata adds a item rule for each lookAhead we simply merge its lookAheads
				var original_itemRule = this._registerItems[itemRule.getIdentity()];

				if (itemRule.lookAhead && itemRule.lookAhead.length)
				{
					original_itemRule.lookAhead = original_itemRule.lookAhead || [];
					itemRule.lookAhead = itemRule.lookAhead || [];

					var mergedLookAheads = original_itemRule.lookAhead.concat(itemRule.lookAhead),
						original_itemRule_lookAhead_length = this._registerItems[itemRule.getIdentity()].lookAhead.length;

					this._registerItems[itemRule.getIdentity()].lookAhead = k.utils.obj.uniq(mergedLookAheads, function (item) { return item.name;});

					var is_item_already_queued = k.utils.obj.filter(this._unprocessedItems, function (unprocessed_item)
					{
						return unprocessed_item.getIdentity() === itemRule.getIdentity();
					}).length > 0;

					//If there were changes in the lookAhead and the rule is not already queued.
					if (original_itemRule_lookAhead_length !== this._registerItems[itemRule.getIdentity()].lookAhead.length && !is_item_already_queued)
					{
						this._unprocessedItems.push(itemRule);
					}
				}
			}
		}, this);
	};

	/* @method Convert the current state to its string representation
	 * @returns {String} formatted string */
	state.prototype.toString = function() {
		var strResult = 'ID: ' + this.getIdentity() + '\n' +
						this._items.join('\n') +
						'\nTRANSITIONS:\n';

		k.utils.obj.each(this.transitions, function (transition)
		{
			strResult += '*--' + transition.symbol + '-->' + transition.state.getIdentity() + '\n';
		});
		return strResult;
	};

	/* @method Returns the condenced (one line) string that reprenset the current 'state' of the current state
	 * @returns {String} State Representation in one line  */
	state.prototype.getCondencedString = function() {
		if(!this._condencedView)
		{
			this._condencedView = this._generateCondencedString();
		}
		return this._condencedView;
	};

	/* @method Internal method to generate a condenced (one line) string that reprenset the current 'state' of the current state
	 * @returns {String} State Representation in one line  */
	state.prototype._generateCondencedString = function() {
		return  k.utils.obj.map(
			k.utils.obj.sortBy(this._items, function(item)
			{
				return item.rule.index;
			}),
			function (item) {
				return item.rule.index;
			}).join('-');
	};

	/* @method Generates an ID that identify this state from any other state
	 * @returns {String} Generated ID  */
	state.prototype._generateIdentity = function() {

		if (this.isAcceptanceState)
		{
			return state.constants.AcceptanceStateName;
		}
		else if (!this._items.length)
		{
			return _super.prototype._generateIdentity.apply(this, arguments);
		}

		return k.utils.obj.reduce(
			k.utils.obj.sortBy(this._items, function(item)
			{
				return item.rule.index;
			}),
			function (acc, item) {
				return acc + item.getIdentity(); //.rule.index + '(' + item.dotLocation + ')';
			}, '');
	};

	/* @method Returns a copy the items contained in the current state
	 * @returns {[ItemRule]} Array of cloned item rules  */
	state.prototype.getItems = function() {
		return k.utils.obj.map(this._items, function(item) {
			return item.clone();
		});
	};

	/* @method Returns an orignal item rule based on its id.
		This method is intended to be use as READ-ONLY, editing the returned items will affect the state and the rest of the automata at with this state belongs to.
	 * @returns {[ItemRule]} Array of current item rules  */
	state.prototype.getOriginalItems = function() {
		return this._items;
	};

	/* @method Returns an orignal item rule based on its id.
		This method is intended to be use as READ-ONLY, editing the returned items will affect the state and the rest of the automata at with this state belongs to.
	 * @returns {ItemRule} Item rule corresponding to the id passed in if present or null otherwise  */
	state.prototype.getOriginalItemById = function(id) {
		return this._registerItems[id];
	};

	/** @method Get the list of all supported symbol which are valid to generata transition from the current state.
	 * @returns {[Object]} Array of object of the form: {symbol, items} where items have an array of item rules  */
	state.prototype.getSupportedTransitionSymbols = function() {
		var itemsAux = {},
			result = [],
			symbol;

		k.utils.obj.each(this._items, function (item)
		{
			symbol = item.getCurrentSymbol();
			if (symbol)
			{
				if (itemsAux[symbol.name]) {
					itemsAux[symbol.name].push(item);
				}
				else
				{
					itemsAux[symbol.name] = [item];
					result.push({
						symbol: symbol,
						items: itemsAux[symbol.name]
					});
				}
			}
		});

		return result;
	};

	/* @method Responsible of new transitions. We override this method to use the correct variable names and be more meanful
	 * @param {Symbol} symbol Symbol use to make the transition, like the name of the transition
	 * @param {State} state Destination state arrived when moving with the specified tranisiotn
	 * @returns {Object} Transition object  */
	state.prototype._generateNewTransition = function (symbol, state) {
		return {
			symbol: symbol,
			state: state
		};
	};

	/* @method Returns the list of item rules contained in the current state that are reduce item rules.
	 * @returns {[ItemRule]} Recude Item Rules  */
	state.prototype.getRecudeItems = function () {
		return k.utils.obj.filter(this._items, function (item) {
			return item.isReduce();
		});
	};

	return state;
})(k.data.Node);
/* Automata
* @class
* @classdesc This class reprensent an automata, whith all its state and transitions */
k.data.Automata = (function() {
	'use strict';
	/*
	* Automata Constructor
	*
	* @constructor
	* @param {[State]} options.states Array of initial states
	* @param {State} options.initialState Initial state of the automata.
	* @param {Bool} options.hasLookAhead Boolean value used to indicate if the items if the state use or not look ahead.
	*/
	var automata = function (options)
	{
		this.options = options;

		k.utils.obj.defineProperty(this, 'states');
		k.utils.obj.defineProperty(this, 'initialState');
		//Determines if the current autamata has or not lookAhead. This is set by the automata Generator
		k.utils.obj.defineProperty(this, 'hasLookAhead');


		k.utils.obj.defineProperty(this, '_index');
		k.utils.obj.defineProperty(this, '_unprocessedStates');
		k.utils.obj.defineProperty(this, '_registerStates');

		this.states = options.states || [];
		this._unprocessedStates = [];
		this._index = 0; //Index used to traversal the states of the current instance
		this._registerStates = k.utils.obj.groupBy(this.states, function (state) {return state.getIdentity();});

		if (this.states.length)
		{
			this._unprocessedStates = [].concat(this.states);
		}
	};

	/* @method Convert the current automata to its string representation
	* @returns {String} formatted string */
	automata.prototype.toString = function ()
	{
		return this.states.join('\n');
	};

	/* @method Get the next unprocessed state
	* @returns {State} A State not processed yet if any or null otherwise */
	automata.prototype.getNextState = function()
	{
		return this._unprocessedStates.splice(0,1)[0];
	};

	/* @method Set or get the initial state.
	* @param {State} state If specified, set the initial state of the automata
	* @returns {State} In case that none state is specifed returnes the initial state previously set */
	automata.prototype.initialStateAccessor = function(state)
	{
		if (!state) {
			return this.initialState;
		}
		this.initialState = state;
	};

	/* @method Add a new state into the automata controlling if it is duplicated or not. If the new state is duplicated we merge its look-ahead
	* @param {State} newState State to add
	* @returns {State} The added state, if the state is duplicated returns the already created state */
	automata.prototype.addState = function(newState)
	{
		if (!this._registerStates[newState.getIdentity()])
		{
			this._registerStates[newState.getIdentity()] = newState;
			this.states.push(newState);
			this._unprocessedStates.push(newState);
		}
		else if (this.hasLookAhead)
		{
			//When the states are the same in rules but its only difference is in its the look aheads, as a easy-to-implement LALR(1) parser, we merge this look-aheads
			var currentState = this._registerStates[newState.getIdentity()],
				currentStateHasChange = false;

			k.utils.obj.each(currentState.getOriginalItems(), function (originalItemRule)
			{
				var newItemRule = newState.getOriginalItemById(originalItemRule.getIdentity()),
					originalItemRuleLookAheadLength = originalItemRule.lookAhead.length;

				originalItemRule.lookAhead = k.utils.obj.uniq(originalItemRule.lookAhead.concat(newItemRule.lookAhead), function (item) { return item.name;});

				if (!currentStateHasChange && originalItemRuleLookAheadLength !== originalItemRule.lookAhead.length)
				{
					currentStateHasChange = true;
				}
			});

			if (currentStateHasChange)
			{
				var isCurrentStateAlreadyUnProcessed = k.utils.obj.find(this._unprocessedStates, function (unprocessedState)
				{
					return currentState.getIdentity() === unprocessedState.getIdentity();
				});

				if (!isCurrentStateAlreadyUnProcessed)
				{
					this._unprocessedStates.push(currentState);
				}
			}
		}
		return this._registerStates[newState.getIdentity()];
	};

	return automata;
})();

/*global toString: true*/
//TODO: Implement a REAL lexer. This one is just a temporal one!

/* Lexer
* @class
* @classdesc This class scan an input stream and convert it to an token input */
k.lexer.Lexer = (function() {
	'use strict';

	var defaultOptions = {
		notIgnoreSpaces : false
	};

	/*
	* Initialize a new Lexer
	*
	* @constructor
	* @param {Grammar} options.grammar Grammar used to control the scan process
	* @param {String} options.stream Input Stream (Generally a String)
	* @param {Boolean} options.notIgnoreSpaces If true spaces are not ignored. False by default.
	*	IMPORTANT: If the grammar has empty rules (A --> <EMPTY>) ignoring spaces will make that the lexer returns EOF instead of EMPTY at the end of the string ('').
	* @param {Boolean} options.notIgnoreNewLines If true enters are not ignored. False by default.
	*	IMPORTANT: If the grammar has empty rules (A --> <EMPTY>) ignoring new lines will make that the lexer returns EOF instead of EMPTY at the end of the string ('').
	* @param {Boolean} options.usePriorities Indicate that the lexer should select the token based on the priority of each terminal. Default value: false
	* @param {Boolean} options.useMultipleMatching Indicate that the lexer should; first accept a list of valid token from the parser and second, from that list return the first that match. It is recommended to use this feature with Priorities feature enabled too. Default value: false
	*   IMPORTANT: It is recommended to use priorities feature when using multi-matching, otherwise the returning token will be defined based on the order in which they were defined in the grammar!
	*/
	var lexer = function (options)
	{
		this.options = k.utils.obj.extendInNew(defaultOptions, options || {});

		k.utils.obj.defineProperty(this, 'grammar');
		k.utils.obj.defineProperty(this, 'stream'); //Specified input stream
		k.utils.obj.defineProperty(this, 'inputStream'); // Post-Processed input stream
		k.utils.obj.defineProperty(this, 'notIgnoreSpaces');
		k.utils.obj.defineProperty(this, 'notIgnoreNewLines');
		k.utils.obj.defineProperty(this, 'usePriorities');
		k.utils.obj.defineProperty(this, 'useMultipleMatching');

		k.utils.obj.defineProperty(this, '_line');
		k.utils.obj.defineProperty(this, '_character');
		k.utils.obj.defineProperty(this, '_ignoredString'); //The characters that werre ignored based in the current configuration
		//this cuold be spaced and/or enters and/or tabs

		this.setStream(this.stream);
	};

	/* @method Set the input string stream and set to 0 the line and the character position
	* @param {String} stream Input string to be processed
	* @returns {Void} */
	lexer.prototype.setStream = function (stream)
	{
		this.inputStream = this.stream = stream;

		this._line = 0;
		this._character = 0;
		this._ignoredString = '';

		this._clearStream();
	};

	/* @method Process the current string stream to clear ignored spaced and enters, leaving the resulted string in the same inputStream
	* @returns {Void} */
	lexer.prototype._clearStream = function ()
	{
		if (k.utils.obj.isUndefined(this.inputStream))
		{
			this.inputStream = null;
		}
		else
		{
			if (!this.notIgnoreSpaces || !this.notIgnoreNewLines)
			{
				var original_inputString = this.inputStream;
				// ,
				// 	difference_string;

				if (!this.notIgnoreSpaces && !this.notIgnoreNewLines)
				{
					this.inputStream = k.utils.str.fullLtrim(this.inputStream);
				}
				else if (!this.notIgnoreSpaces)
				{
					this.inputStream = k.utils.str.ltrim(this.inputStream);
				}
				else if (!this.notIgnoreNewLines)
				{
					this.inputStream = k.utils.str.ltrimBreaks(this.inputStream);
				}

				this._ignoredString = original_inputString.substr(0, original_inputString.indexOf(this.inputStream));
				this._updatePosition(this._ignoredString);

				// if ignoring spaces and the input string is empty, set the input as finished
				if (this.inputStream === '')
				{
					this.inputStream = null;
				}
			}
		}
	};

	/* @method Get a generic result in case of error, when the lexer cannnot match any terminal in the input
	* @returns {Object} An object representing the error */
	lexer.prototype._getErrorResult = function ()
	{
		return {
			length: -1,
			string: this.inputStream,
			error: 'NOT MATCHING FOUND',
			line: this._line,
			character: this._character
		};
	};

	/* @method Update the current instalce line and position values to track where the reading cursor of the lexer is.
	* This information is used to easily found errors.
	* @param {String} processed_string Last processed string (string chunk removes from the input stream), used to update the line and the character values.
	* @returns {Void} */
	lexer.prototype._updatePosition = function (processed_string)
	{
		if (!processed_string)
		{
			return;
		}

		var indices_location = k.utils.str.getIndicesOf('\n', processed_string);

		if (indices_location.length)
		{
			this._line += indices_location.length;
			this._character = processed_string.substr(k.utils.obj.max(indices_location) + 1).length;
		}
		else
		{
			this._character += processed_string.length;
		}
	};

	/* @method Process the result based on the current lexer instance setting. If using multi-matching the new mathc will be added into the list of result otherwise the more specified will be selected*
	* @param {Object|Array<Objects>} last_result Last matching token if NOT using multi matching or an array of matching tokens if DO using multi-matching. In the case there were no previous found token, this object should have a property length with -1 as a value or be an empty array.
	* @param {String} matching_string The new found string that match the input stream
	* @param {Terminal} terminal Terminal used to match the matching_string string
	* @returns {Object|Array<Objects>} A token object or an array of token objects
	* {Number} result.length Length of the matched string
	* {Number} result.line Line number where token was found or expected
	* {Number} result.character Position where the token was found or expected
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal*/
	lexer.prototype._chooseMoreSpecifcToken = function (last_result, matching_string, terminal)
	{
		if (this.useMultipleMatching)
		{
			return this._chooseMoreSpecificArrayTokens(last_result, matching_string, terminal);
		}
		else
		{
			return this._chooseMoreSpecifcSingleToken(last_result, matching_string, terminal);
		}
	};

	/* @method When using multi-matching return the list of valid matches. This method takes into account if usign priorities and sort the result based on that.
	* @param {Object} last_result Last matching token. In the case there were no previous found token, this values shoudl be an empty arary.
	* @param {String} matching_string The new found string that match the input stream
	* @param {Terminal} terminal Terminal used to match the matching_string string
	* @returns {Array<Object>} Array of  token objects, each of them is compose by:
	* {Number} result.length Length of the matched string
	* {Number} result.line Line number where token was found or expected
	* {Number} result.character Position where the token was found or expected
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal*/
	lexer.prototype._chooseMoreSpecificArrayTokens =  function (last_results, matching_string, terminal)
	{
		var result = k.utils.obj.isArray(last_results) ? last_results : [];

		result.push({
			length: matching_string.length,
			string: matching_string,
			line: this._line,
			character: this._character,
			terminal: terminal
		});

		if (this.usePriorities)
		{
			result = k.utils.obj.sortBy(result, function (token)
			{
				return -(token.terminal.priority || 0);
			});
		}

		return result;
	};

	/* @method Select the more specific token, between the last found one and the new found match. The behaviour of this method is determined by the use of priorities (this.usePriorities) or not.
	* @param {Object} last_result Last matching token. In the case there were no previous found token, this object should have a property length with -1 as a value
	* @param {String} matching_string The new found string that match the input stream
	* @param {Terminal} terminal Terminal used to match the matching_string string
	* @returns {Object} A token object
	* {Number} result.length Length of the matched string
	* {Number} result.line Line number where token was found or expected
	* {Number} result.character Position where the token was found or expected
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal*/
	lexer.prototype._chooseMoreSpecifcSingleToken = function (last_result, matching_string, terminal)
	{
		if (last_result.length < 0 || !last_result.terminal)
		{
			//if there are no previous result, the new found string is the new one.
			return {
				length: matching_string.length,
				string: matching_string,
				line: this._line,
				character: this._character,
				terminal: terminal
			};
		}

		if (this.usePriorities && terminal.priority > last_result.terminal.priority)
		{
			return {
				length: matching_string.length,
				string: matching_string,
				line: this._line,
				character: this._character,
				terminal: terminal
			};
		}
		else
		{
			if (last_result.length < matching_string.length)
			{
				return {
					length: matching_string.length,
					string: matching_string,
					line: this._line,
					character: this._character,
					terminal: terminal
				};
			}
			return last_result;
		}
	};

	/* @method Searh for the next token the in the current inputStream.
	* IMPORTANT: In order to call this function the inputStream should not be null neither the empty string.
	* @returns {Object} An object representing the current finded token.
	* {Number} result.length Length of the matched string
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal */
	lexer.prototype._searchNextToken = function ()
	{
		var result = this.useMultipleMatching ?
			[] :
			{
				length: -1
			},
			body;

		k.utils.obj.each(this.grammar.terminals, function (terminal)
		{
			body = terminal.body;
			//If it's reg exp and match (this.inputStream.search(body) returns the index of matching which evals to false so !)
			if (body instanceof RegExp && !this.inputStream.search(body))
			{
				var match = body.exec(this.inputStream)[0];
				result = this._chooseMoreSpecifcToken(result, match, terminal);
			}

			//if it is a string check if they are the same
			else if (k.utils.obj.isString(body) && k.utils.str.startsWith(this.inputStream, body) )
			{
				result = this._chooseMoreSpecifcToken(result, body, terminal);
			}
		}, this);

		return result;
	};

	/* @method Filter found token/s and update the inputStream
	* @param {Object|Array<Object>} result Found token in the case of not usign multi-matching or an array of found tokens.
	* @param {Array<String>} validNextTerminals Array of valid next terminal NAMES. This value is used when the lexer is configure to use multi-matching
	* @returns {Object} An object representing the current finded token.
	* {Number} result.length Length of the matched string
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal */
	lexer.prototype._filterAndCleanResult = function (result, validNextTerminals)
	{
		var filter_result = {};
		if (this.useMultipleMatching)
		{
			filter_result = this._filterAndCleanMultiMatchingResults(result, validNextTerminals);
		}
		else
		{
			filter_result =  this._filterAndCleanSingleResult(result);
		}


		if (filter_result.length === -1)
		{
			//if there is no valid match, we return the current input stream as an error
			filter_result = this._getErrorResult();
		}
		else
		{
			//If there is a match
			this._updatePosition(filter_result.string);

			filter_result.line = this._line;
			filter_result.character = this._character;
			filter_result.ignoredString = this._ignoredString;

			this.inputStream = this.inputStream.substr(filter_result.length);
			this._clearStream();
		}

		return filter_result;
	};

	/* @method In case the found token, result param, is a valid match update the line and catacter positions and set those values in the result
	* @param {Object} result Found token.
	* @returns {Object} An object representing the current finded token.
	* {Number} result.length Length of the matched string
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal */
	lexer.prototype._filterAndCleanSingleResult = function (result)
	{
		return result;
	};

	/* @method Filter list of found tokens and return the most appropriate one
	* @param {Array<Object>} result Array of found tokens.
	* @param {Array<String>} validNextTerminals Array of valid next terminal NAMES.
	* @returns {Object} An object representing the current finded token.
	* {Number} result.length Length of the matched string
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal */
	lexer.prototype._filterAndCleanMultiMatchingResults = function (results, validNextTerminals)
	{
		//If using priorities feature the array of result should already be sorted!
		//IMPORTANT: It is recommended to use priorities feature when using multi-matching, otherwise the returning
		//token will be defined based on the order in which they were defined in the grammar!
		var final_result = k.utils.obj.find(results, function (token)
		{
			return k.utils.obj.contains(validNextTerminals, token.terminal.name);
		});

		return final_result || {length:-1};
	};

	/* @method Get next input token
	* @param {Array<String>} validNextTerminals Array of valid next terminal NAMES. This value is used when the lexer is configure to use multi-matching
	* @returns {Object} An object representing the current found token.
	* {Number} result.length Length of the matched string, -1 if there is not matching
	* {String} result.error Error description in case of error, undefiend otherwise
	* {Number} result.line Line number where token was found or expected
	* {Number} result.character Position where the token was found or expected
	* {String} result.string String matched
	* {Terminal} result.terminal matching terminal */
	lexer.prototype.getNext = function (validNextTerminals)
	{
		var result = {
				length: -1
			},
			grammarHasEmptyRules;

		if (this.inputStream === null)
		{
			//finished input stream
			result = {
				length: -1,
				line: this._line,
				character: this._character,
				terminal: new k.data.Symbol({name: k.data.specialSymbol.EOF})
			};
		}
		else if (this.inputStream === '')
		{
			grammarHasEmptyRules = grammarHasEmptyRules || k.utils.obj.find(this.grammar.rules, function (rule)
				{
					return rule.tail.length === 1 && rule.tail[0].isSpecial && rule.tail[0].name === k.data.specialSymbol.EMPTY;
				});

			if (grammarHasEmptyRules)
			{
				result = {
					length: 0,
					string: '',
					line: this._line,
					character: this._character,
					terminal: new k.data.Symbol({name: k.data.specialSymbol.EMPTY})
				};
				this.inputStream = null;
			}
			else
			{
				result = this._getErrorResult();
			}
		}
		else
		{
			result = this._searchNextToken();
			result = this._filterAndCleanResult(result, validNextTerminals);
		}

		return result;
	};

	return lexer;
})();

/*Enum for valid action in an action table
* @readonly
* @enum {String}
*/
var tableAction = k.parser.tableAction = {
	SHIFT: 'SHIFT',
	REDUCE: 'REDUCE',
	ERROR: 'ERROR',
	ACCEPT: 'ACCEPT'
};

/* Abstract Base Automata Generator
* @class
* @classdesc This is the base class for all LR automatas generator. The idea is simplify the autamata creation process */
k.parser.AutomataLRGeneratorBase = (function() {
	'use strict';

	/*
	* Initialize a new Automaton Generator
	*
	* @constructor
	* @param {Grammar} options.grammar Grammar used to generate the automata
	*/
	var automataLRGeneratorBase = function (options)
	{
		this.options = options;

		k.utils.obj.defineProperty(this, 'grammar');

		if (!(this.grammar instanceof k.data.Grammar))
		{
			throw new Error('In order to create a new Automata Generator please provide a grammar!');
		}
	};

	/* @method Expands a state adding in it the full list of require items (item rules)
	* @param {State} currentState State that will be expanded
	* @returns {State} The full state with all its require items */
	automataLRGeneratorBase.prototype.expandItem = function (currentState)
	{
		// The inital rule is first added and then this method is called
		var currentSymbol,
			currentItem = currentState.getNextItem();

		while (currentItem) {
			currentSymbol = currentItem.getCurrentSymbol();

			if (currentSymbol instanceof k.data.NonTerminal)
			{
				currentState.addItems(this._newItemRulesForStateExpansion(currentItem, currentSymbol), this._getExpansionItemNewItemsOptions());
			}

			currentItem = currentState.getNextItem();
		}

		return currentState;
	};

	/* @method Generate the options used to add item rules into the states when thy are being expanded
	* @returns {Object} An object specifying the options used by the state.addItems method to include methods */
	automataLRGeneratorBase.prototype._getExpansionItemNewItemsOptions = function ()
	{
		return {};
	};

	/* @method Generate the list of item rules that can be getted from a state when expanding it in the automata creation prcoess.
	* This method is intended to be overwritten!.
	* @param {ItemRule} currentItem The current item rule from which the new item rule are being generated.
	* @param {Symbol} currentSymbol Is the symbol used to find new item rules.
	* @returns {Array<ItemRule>} Array of item rule ready to be part of the current processing state */
	automataLRGeneratorBase.prototype._newItemRulesForStateExpansion = function (currentItem, currentSymbol)
	{};

	/* @method Generate the requested automata
	* This method allows that sub-clases override it and have already almost all the implementation done in the method _generateAutomata()
	* @param {Boolean} options.notValidate Indicate if the resulting automata should be validated for the current lookAhead or not. False by default (DO validate the automata).
	* @param {Array<ConflicResolver>} options.conflictResolvers ORDERED List of conflicts resolvers used in case of conflicts in the state.
	* @returns {Automata} The corresponding automata for the specified grammar */
	automataLRGeneratorBase.prototype.generateAutomata = function (options)
	{
		var defaultAutomataGenerationOptions = {
				notValidate: false,
				conflictResolvers: []
			};

		options = k.utils.obj.extendInNew(defaultAutomataGenerationOptions, options || {});

		var automata = this._generateAutomata();

		if (!options.notValidate && !this.isAutomataValid(automata, options))
		{
			return false;
		}

		return automata;
	};

	/* @method Validates an automata based on the current generator type (consider or not look-ahead)
	* @param {Autamata} automata Automata instances to be validated
	* @param {Array<ConflicResolver>} options.conflictResolvers ORDERED List of conflicts resolvers used in case of conflicts in the state.
	* @returns {Boolean} true in case the automata is valid, false otherwise */
	automataLRGeneratorBase.prototype.isAutomataValid = function (automata, options)
	{
		var defaultValidationOptions = {
			automata: automata
		};

		options = k.utils.obj.extend(defaultValidationOptions, options || {});

		return !k.utils.obj.any(automata.states, function (state)
		{
			return !this.isStateValid(state, options);
		}, this);
	};

	/* @method Determine if the indicated state is valid or not.
	* This method is intended to be overwritten!.
	* @param {State} state State to validate
	* @param {Boolean} options.considerLookAhead Indicate if the state should take into account look ahead to validate. Default: false
	* @param {Automata} options.automata Optional automata instance used to pass to the conflict resolver in case there are conflict and resolvers.
	* @returns {Boolean} true if the state is valid (invalid), false otherwise (inconsistent) */
	automataLRGeneratorBase.prototype.isStateValid = function (state, options)
	{
	};

	/* @method Generate the conflict resolvers list use to solve any possible conflict when validating the automata and when creating the Action table.
	* @returns {Automata} The corresponding automata for the specified grammar */
	automataLRGeneratorBase.prototype._getConflictResolvers = function ()
	{
	};

	/* @method Actually Generate an automata
	* @returns {Automata} The corresponding automata for the specified grammar */
	automataLRGeneratorBase.prototype._generateAutomata = function()
	{
		var initialState = new k.data.State({
				items: this._getInitialStateItemRules()
			}),
			automata = new k.data.Automata(this._getNewAutomataOptions(initialState));

		automata.initialStateAccessor(initialState);
		this._expandAutomata(automata);
		return automata;
	};

	/* @method Generate the construction object used to initialize the new automata
	* @param {State} initialState State that only contains the items rules from the start symbol of the grammar. This is the initial state before being expanded.
	* @returns {Object} Object containing all the options used to create the new automata */
	automataLRGeneratorBase.prototype._getNewAutomataOptions = function (initialState)
	{
		return {
			states: [this.expandItem(initialState)]
		};
	};

	/* @method Returns the initial list of item rules that will take part in the initial state of the automata. This can differ if the automata has or not lookahead
	* @returns {Array<ItemRule>} The initial list of item rule. */
	automataLRGeneratorBase.prototype._getInitialStateItemRules = function ()
	{};

	/* @method Internal method which resive an inital automata with only it inital state and generate a full automata
	* @param {Automata} automata Automatma to be expanded
	* @returns {Automata} A full automata */
	automataLRGeneratorBase.prototype._expandAutomata = function(automata)
	{
		var currentState = automata.getNextState();

		while (currentState) {

			//Get all valid symbol from which the current state can have transitions
			var supportedTransitions = currentState.getSupportedTransitionSymbols(),
				addedState, //To control duplicated states
				newItemRules = [];

			// For each supported transicion from the current state, explore neighbours states
			//Warning remove to create function inside this loop
			/*jshint -W083 */
			k.utils.obj.each(supportedTransitions, function (supportedTransition)
			{
				// for the current new neighbour of the current state, generate the basic state with the known items
				k.utils.obj.each(supportedTransition.items, function (supportedItem)
				{
					// Because each item in the supported transition does NOT move the dot location when retrieved from the state, we MUST do that here
					newItemRules.push(supportedItem.clone({
						dotLocationIncrement: 1
					}));
				});

				var newState = new k.data.State({
					items: newItemRules
				});

				this.expandItem(newState, automata);

				// We determien if the new state is an acceptance state, if it has only the augmented rule in reduce state.
				newState.isAcceptanceState = !!(newState.getOriginalItems().length === 1 && newState.getOriginalItems()[0].rule.name === k.data.Grammar.constants.AugmentedRuleName && newState.getOriginalItems()[0].dotLocation === 2);

				// Add state controlling duplicated ones
				addedState = automata.addState(newState);

				currentState.addTransition(supportedTransition.symbol, addedState);

				newItemRules = [];
			}, this);

			currentState = automata.getNextState();
		}
	};

	/* @method Given an automata returnes its GOTO Table. The table is represented by an object where each state is a property (row) and each possible symbol is a property of the previous object (column)
	* Sample: table[<state>][<symbol>] = [undefined = error|<state id - string>]
	* @param {Automata} automata Automatma used as a base of the calculation
	* @returns {Object} A GOTO Table */
	automataLRGeneratorBase.prototype.generateGOTOTable = function(automata)
	{
		var table = {};

		k.utils.obj.each(automata.states, function (state)
		{
			table[state.getIdentity()] = {};

			k.utils.obj.each(state.transitions, function (transition) {
				table[state.getIdentity()][transition.symbol.toString()] = transition.state;
			});
		});

		return table;
	};

	/* @method Given an automata returnes its ACTION Table.
	* The intend of this method is to be overwriten by each son class
	* @param {Automata} automata Automatma used as a base of the calculation.
	* @param {Boolean} options.ignoreErrors Indicate that when a state is in an error that cannot be resolver, continue the execution anyway.
	* @param {Boolean} options.conflictResolvers List of resolver in case of conflic in any state.
	* @returns {Object} An object that represent the table, the first keys are the row and the second (in case there exist) are the columns */
	automataLRGeneratorBase.prototype.generateACTIONTable = function (automata, options)
	{};

	return automataLRGeneratorBase;
})();

/* Automata Generator
* @class
* @classdesc This class is reponsible for given a grammar create a new LR(0) automata */
k.parser.AutomataLR0Generator = (function(_super) {
	'use strict';
	/* jshint latedef:false */
	k.utils.obj.inherit(automataLR0Generator, _super);

	/*
	* Initialize a new Automaton Generator
	*
	* @constructor
	* @param {Grammar} options.grammar Grammar used to generate the automata
	*/
	function automataLR0Generator (options)
	{
		_super.apply(this, arguments);
	}

	/* @method Override super method to return the list of item rules that has as its head the current symbol, without taking into account the lookAhead
	* @param {ItemRule} currentItem The current item rule from which the new item rule are being generated.
	* @param {Symbol} currentSymbol Is the symbol used to find new item rules.
	* @returns {Array<ItemRule>} Array of item rule ready to be part of the current processing state */
	automataLR0Generator.prototype._newItemRulesForStateExpansion = function (currentItem, currentSymbol)
	{
		return k.data.ItemRule.newFromRules(this.grammar.getRulesFromNonTerminal(currentSymbol));
	};

	/* @method Generate the construction object used to initialize the new automata. Override the super method to indicate that te automata should NOT use lookahead
	* @param {State} initialState State that only contains the items rules from the start symbol of the grammar. This is the initial state before being expanded.
	* @returns {Object} Object containing all the options used to create the new automata */
	automataLR0Generator.prototype._getNewAutomataOptions = function ()
	{
		var result = _super.prototype._getNewAutomataOptions.apply(this, arguments);
		result.hasLookAhead = false;

		return result;
	};

	/* @method Override super method to return the list of item rules that has as its head the start symbol of the grammar
	* @returns {Array<ItemRule>} The initial list of item rule. */
	automataLR0Generator.prototype._getInitialStateItemRules = function ()
	{
		return 	[new k.data.ItemRule({
					rule: this.grammar.getRulesFromNonTerminal(this.grammar.startSymbol)[0],
					lookAhead: []
				})];
	};

	/* @method Given an automata returnes its ACTION Table.
	* @param {Automata} automata Automatma used as a base of the calculation
	* @returns {Function} Function that given the a state id and a lookAhead returns the action to take */
	automataLR0Generator.prototype.generateACTIONTable = function (automata)
	{
		var table = {};

		k.utils.obj.each(automata.states, function(state)
		{
			var stateItems = state.getItems();

			// If it is a REDUCE state
			if (stateItems.length === 1 && stateItems[0].dotLocation === (stateItems[0].rule.tail.length))
			{
				// S'--> S#*
				if (state.isAcceptanceState) {
					 table[state.getIdentity()] = {
						action: k.parser.tableAction.ACCEPT,
						rule: stateItems[0].rule
					};
				}
				else
				{
					table[state.getIdentity()] = {
						action: k.parser.tableAction.REDUCE,
						rule: stateItems[0].rule
					};
				}
			// SHIFT state
			} else {
				table[state.getIdentity()] = {
					action: k.parser.tableAction.SHIFT
				};
			}
		});


		return (function (actionTable) {
			return function (currentStateId, look_ahead)
			{
				return actionTable[currentStateId] || {
					action: k.parser.tableAction.ERROR
				};
			};
		})(table);
	};

	/* @method  Override super method to determine if the indicated state is valid or not.
	* @param {State} state State to validate
	* @param {Boolean} options.considerLookAhead Indicate if the state should take into account look ahead to validate. Default: false
	* @param {Automata} options.automata Optional automata instance used to pass to the conflict resolver in case there are conflict and resolvers.
	* @returns {Boolean} true if the state is valid (invalid), false otherwise (inconsistent) */
	automataLR0Generator.prototype.isStateValid = function (state, options)
	{
		//NOTE: Important! When usign this method the current implementation DOES NOT USE RESOLVERS IN THIS CASE! it just return false if invalid
		//TODO IMPLEMENT IT
		options = k.utils.obj.isObject(options) ? options : {};
		options.conflictResolvers = options.conflictResolvers || [];

		var reduceItems = state.getRecudeItems();

		return !(reduceItems.length !== state.getOriginalItems().length && reduceItems.length > 0 || reduceItems.length > 1);
	};

	return automataLR0Generator;
})(k.parser.AutomataLRGeneratorBase);

/* Automata Generator
* @class
* @classdesc This class is reponsible for given a grammar create a new LR(0) automata */
k.parser.AutomataLALR1Generator = (function(_super)
{
	'use strict';
	/* jshint latedef:false */
	k.utils.obj.inherit(automataLALR1Generator, _super);

	/*
	* Initialize a new Automaton Generator
	*
	* @constructor
	* @param {Grammar} options.grammar Grammar used to generate the automata
	*/
	function automataLALR1Generator (options)
	{
		_super.apply(this, arguments);
	}

	/* @method Override super method to return the list of item rules that has as its head the current symbol, TAKING into account the lookAhead
	* @param {ItemRule} currentItem The current item rule from which the new item rule are being generated.
	* @param {Symbol} currentSymbol Is the symbol used to find new item rules.
	* @returns {[ItemRule]} Array of item rule ready to be part of the current processing state */
	automataLALR1Generator.prototype._newItemRulesForStateExpansion = function (currentItem, currentSymbol)
	{
		var lookAhead = this._getFirstSet(currentItem);
		return k.data.ItemRule.newFromRules(this.grammar.getRulesFromNonTerminal(currentSymbol), lookAhead);
	};

	/* @method Gets the array of look-ahead for the particular item rule taking into account the dot location fo the specified item rule.
	* @param {ItemRule} itemRule Item rule to find FIRST Set
	* @returns {Array<Terminals>} First set for specified look ahead */
	automataLALR1Generator.prototype._getFirstSet = function (itemRule)
	{
		var symbolsToTraverse = itemRule.rule.tail.slice(itemRule.dotLocation + 1),
			requestedFirstSet = [];

		//symbolsToTraverse = symbolsToTraverse.concat(itemRule.lookAhead);

		if (symbolsToTraverse.length)
		{
			k.utils.obj.find(symbolsToTraverse, function (symbolTraversed)
			{
				if (symbolTraversed instanceof k.data.NonTerminal)
				{
					requestedFirstSet = requestedFirstSet.concat(this.grammar.firstSetsByHeader[symbolTraversed.name]);
					requestedFirstSet = k.utils.obj.uniq(requestedFirstSet, false, function (item) {return item.name;});
					return !symbolTraversed.isNullable;
				}
				else if (symbolTraversed instanceof k.data.Terminal)
				{
					requestedFirstSet.push(symbolTraversed);
					return true;
				}
				else if (symbolTraversed.isSpecial && symbolTraversed.name === k.data.specialSymbol.EOF)
				{
					requestedFirstSet.push(symbolTraversed);
					return true;
				}
				else
				{
					throw new Error('Invalid Item Rule. Impossible calculate first set. Item Rule: ' + itemRule.toString());
				}

			}, this);
		}
		else
		{
			requestedFirstSet = itemRule.lookAhead;
		}

		return requestedFirstSet;
	};

	/* @method Generate the construction object used to initialize the new automata. Override the super method to indicate that te automata should DO use lookahead
	* @param {State} initialState State that only contains the items rules from the start symbol of the grammar. This is the initial state before being expanded.
	* @returns {Object} Object containing all the options used to create the new automata */
	automataLALR1Generator.prototype._getNewAutomataOptions = function ()
	{
		var result = _super.prototype._getNewAutomataOptions.apply(this, arguments);
		result.hasLookAhead = true;

		return result;
	};

	/* @method Override super method to return the list of item rules that has as its head the start symbol of the grammar, TAKING into account the lookAhead
	* @returns {Array<ItemRule>} The initial list of item rule. */
	automataLALR1Generator.prototype._getInitialStateItemRules = function ()
	{
		return [new k.data.ItemRule({
					rule: this.grammar.getRulesFromNonTerminal(this.grammar.startSymbol)[0],
					lookAhead: [new k.data.Symbol({name: k.data.specialSymbol.EOF, isSpecial: true})]
				})];
	};

	/* @method Given an automata returnes its ACTION Table.
	* @param {Automata} automata Automatma used as a base of the calculation
	* @returns {Function} Function that given the a state id and a lookAhead returns the action to take */
	automataLALR1Generator.prototype.generateACTIONTable = function (automata, options)
	{
		var table = {};

		k.utils.obj.each(automata.states, function (state)
		{
			table[state.getIdentity()] = {};

			if (state.isAcceptanceState)
			{
				table[state.getIdentity()][k.data.specialSymbol.EOF] = {
					action: k.parser.tableAction.ACCEPT,
					rule: state.getOriginalItems()[0].rule //As we augment the grammar in the acceptance state is should be only one rule, the augmented rule, for that reason is the 0
				};
			}
			else
			{
				var defaultActionTableStateOptions = {
					ignoreErrors: false,
					considerLookAhead: true
				};
				options = k.utils.obj.extendInNew(defaultActionTableStateOptions, options || {});

				var stateItems = this.getShiftReduceItemRuleFromState(state, options);

				if (!stateItems)
				{
					throw new Error('Impossible to generate Action Table. The following state is invalid. State: ' + state.getIdentity());
				}

				//Shift Items
				k.utils.obj.each(stateItems.shiftItems, function (shiftItem)
				{
					table[state.getIdentity()][shiftItem.getCurrentSymbol().name] = {
						action: k.parser.tableAction.SHIFT
					};
				});

				//Reduce Items
				//IMPORTANT: At this point the automata MUST be already validated, ensuring us that the lookAhead sets ARE DISJOINT
				k.utils.obj.each(stateItems.reduceItems, function (reduceItemRule)
				{
					k.utils.obj.each(reduceItemRule.lookAhead, function (reduceSymbol)
					{
						table[state.getIdentity()][reduceSymbol.name] = {
							action: k.parser.tableAction.REDUCE,
							rule: reduceItemRule.rule
						};
					});
				});
			}
		}, this);

		return table;
	};

	/* @method  Override super method to determine if the current state is valid or not.
	 * @param {Boolean} options.considerLookAhead Indicate if the state should take into account look ahead to validate. Default: false
	 * @param {Automata} options.automata Optional automata instance used to pass to the conflict resolver in case there are conflict and resolvers.
	 * @param {[ConflictResolver]} options.conflictResolvers List of conflict resolvers used to resolve possible conflict at the current state.
	 * @returns {Boolean} true if the state is valid (invalid), false otherwise (inconsistent) */
	automataLALR1Generator.prototype.isStateValid = function (state, options)
	{
		options = k.utils.obj.isObject(options) ? options : {};
		options.conflictResolvers = options.conflictResolvers || [];

		var reduceItems = state.getRecudeItems(),
			isTheConflictResolvableWithResolvers = false;

		var shiftItems = k.utils.obj.filter(state.getOriginalItems(), function (item)
			{
				return !item.isReduce();
			});

		//Check for SHIFT/REDUCE Conflicts
		if (shiftItems.length && reduceItems.length)
		{
			var shiftReduceResolvers = k.utils.obj.sortBy(k.utils.obj.filter(options.conflictResolvers, function (resolver)
			{
				return resolver.type === k.parser.conflictResolverType.STATE_SHIFTREDUCE;
			}), 'order');

			//Generla Idea: For each shift item rule validate that the shift symbol is not in any lookAhead symbol of any reduce rule

			//For each shift item
			var isAnyShiftReduceConflict = k.utils.obj.any(shiftItems, function (shiftItem)
			{
				//get the shift symbol
				var shiftSymbol = shiftItem.getCurrentSymbol();

				//find among all reduce items
				return k.utils.obj.find(reduceItems, function (reduceItem)
				{
					//if the shift symbol is in any reduce item rule's lookAhead set.

					var isShiftSymbolInReduceLookAhead = k.utils.obj.find(reduceItem.lookAhead, function (lookAheadSymbol) { return lookAheadSymbol.name === shiftSymbol.name;});
					if (isShiftSymbolInReduceLookAhead)
					{
						isTheConflictResolvableWithResolvers = k.utils.obj.find(shiftReduceResolvers, function (resolver)
						{
							return resolver.resolve(options.automata, state, shiftItem, reduceItem);
						});

						return !isTheConflictResolvableWithResolvers;
					}

					return false;
				});
			});

			if (isAnyShiftReduceConflict)
			{
				return false;
			}
		}

		//Check for REDUCE/REDUCE Conflicts
		if (reduceItems.length > 1)
		{
			var reduceReduceResolvers = k.utils.obj.sortBy(k.utils.obj.filter(options.conflictResolvers, function (resolver)
				{
					return resolver.type === k.parser.conflictResolverType.STATE_REDUCEREDUCE;
				}), 'order');

			//General Idea: For each reduce rule, validate that its look Ahead set is disjoin with the rest of the reduce rule

			//for each reduce rule
			var isAnyReduceReduceConflict = k.utils.obj.any(reduceItems, function (reduceItemSelected)
			{
				//compare it with each of the other reduce rules
				return k.utils.obj.find(reduceItems, function (reduceItemInspected)
				{
					if (reduceItemInspected.getIdentity() === reduceItemSelected.getIdentity())
					{
						return false;
					}

					//and for each look ahead symbol of the first reduce rule, validate the it is not present in any other look Ahead
					var isLookAheadSymbolInOtherLookAheadSet = k.utils.obj.find(reduceItemSelected.lookAhead, function (lookAheadSelected)
					{
						return k.utils.obj.find(reduceItemInspected.lookAhead, function (lookAheadSymbol) { return lookAheadSymbol.name === lookAheadSelected.name;});
					});

					if (isLookAheadSymbolInOtherLookAheadSet)
					{
						isTheConflictResolvableWithResolvers = k.utils.obj.find(reduceReduceResolvers, function (resolver)
						{
							return resolver.resolve(options.automata, state, reduceItemSelected, reduceItemInspected);
						});

						return !isTheConflictResolvableWithResolvers;
					}

					return false;
				});

			});

			if (isAnyReduceReduceConflict)
			{
				return false;
			}
		}

		return true;
	};

	/* @method Generates the list of shift and reduce items that take part from the passed in state. Validating at the same time that none of these items are in conflict
		or that the conflicts are solvable.
	 * @param {State} state State to extract form each of the reduce/shift item rules
	 * @param {Boolean} options.considerLookAhead Indicate if the state should take into account look ahead to validate. If not the state will validate and generate the result as in a LR(0). Default: false
	 * @param {Automata} options.automata Optional automata instance used to pass to the conflict resolver in case there are conflict and resolvers.
	 * @param {[ConflictResolver]} options.conflictResolvers List of conflict resolvers used to resolve possible conflict at the current state.
	 * @param {Boolean} options.ignoreErrors Indicate if when facing an error (a conflict that can not be solve by any resolver) continue the execution. Default: false
	 * @returns {Object} An object containg two properties (arrays) shiftItems and reduceItems */
	automataLALR1Generator.prototype.getShiftReduceItemRuleFromState = function (state, options)
	{
		options = k.utils.obj.isObject(options) ? options : {};
		options.conflictResolvers = options.conflictResolvers || [];

		var reduceItems = state.getRecudeItems(),
			shiftItems = k.utils.obj.filter(state.getOriginalItems(), function (item)
			{
				return !item.isReduce();
			}),
			ignoreErrors = !!options.ignoreErrors,
			result = {shiftItems:[], reduceItems:[]},
			isTheConflictResolvableWithResolvers = false;

		//We clone the reduce item, becuase when there is a Shift/Reduce conflic and the solution is shift, we need to remove the shift symbol from the lookAhead set of the reduce item!
		//Otherwise when createion the Action table the reduce item end it up overriding the shift actions! (see automataLALRGenerator)
		reduceItems = k.utils.obj.map(reduceItems, function (reduceItem)
		{
			return reduceItem.clone();
		});

		//Process all SHIFT items & Check for SHIFT/REDUCE Conflicts
		if (shiftItems.length)
		{
			var shiftReduceResolvers = k.utils.obj.sortBy(k.utils.obj.filter(options.conflictResolvers, function (resolver)
			{
				return resolver.type === k.parser.conflictResolverType.STATE_SHIFTREDUCE;
			}), 'order');

			//Generla Idea: For each shift item rule validate that the shift symbol is not in any lookAhead symbol of any reduce rule

			//For each shift item
			var isAnyShiftReduceConflict = k.utils.obj.any(shiftItems, function (shiftItem)
			{
				//get the shift symbol
				var shiftSymbol = shiftItem.getCurrentSymbol();

				//find among all reduce items
				var isShiftItemInConflict = k.utils.obj.find(reduceItems, function (reduceItem)
				{
					//if the shift symbol is in any reduce item rule's lookAhead set.
					//NOTE: Here we obtain the lookAhead Symbol that is in conflict, if any.
					var isShiftSymbolInReduceLookAhead = k.utils.obj.find(reduceItem.lookAhead, function (lookAheadSymbol) { return lookAheadSymbol.name === shiftSymbol.name;});

					//if there is a possible shift/reduce conflict try to solve it by usign the resolvers list
					if (isShiftSymbolInReduceLookAhead)
					{
						var conflictSolutionFound;
						isTheConflictResolvableWithResolvers = k.utils.obj.find(shiftReduceResolvers, function (resolver)
						{
							conflictSolutionFound = resolver.resolve(options.automata, state, shiftItem, reduceItem);
							return conflictSolutionFound;
						});

						//If the conflict is resolvable, and the action to be taken is SHIFT, we remove the Shift symbol from the reduce item lookAhead, so when creating the Action table
						//that symbol wont take part of the table.
						if (isTheConflictResolvableWithResolvers && conflictSolutionFound.action === k.parser.tableAction.SHIFT)
						{
							var symbolIndexToRemove = k.utils.obj.indexOf(reduceItem.lookAhead, isShiftSymbolInReduceLookAhead);
							reduceItem.lookAhead.splice(symbolIndexToRemove,1);
						}

						return !isTheConflictResolvableWithResolvers;
					}

					return false;
				});

				if (!isShiftItemInConflict || ignoreErrors)
				{
					result.shiftItems.push(shiftItem);
					return false;
				}

				return true;

			});

			if (isAnyShiftReduceConflict)
			{
				return false;
			}
		}

		//Process all REDUCE items & Check for REDUCE/REDUCE Conflicts
		if (reduceItems.length)
		{
			var reduceReduceResolvers = k.utils.obj.sortBy(k.utils.obj.filter(options.conflictResolvers, function (resolver)
				{
					return resolver.type === k.parser.conflictResolverType.STATE_REDUCEREDUCE;
				}), 'order');

			//General Idea: For each reduce rule, validate that its look Ahead set is disjoin with the rest of the reduce rule

			//for each reduce rule
			var isAnyReduceReduceConflict = k.utils.obj.any(reduceItems, function (reduceItemSelected)
			{
				//compare it with each of the other reduce rules
				var isReduceItemInConflict = k.utils.obj.find(reduceItems, function (reduceItemInspected)
				{
					if (reduceItemInspected.getIdentity() === reduceItemSelected.getIdentity())
					{
						return false;
					}

					//and for each look ahead symbol of the first reduce rule, validate the it is not present in any other look Ahead
					var isLookAheadSymbolInOtherLookAheadSet = k.utils.obj.find(reduceItemSelected.lookAhead, function (lookAheadSelected)
					{
						return k.utils.obj.find(reduceItemInspected.lookAhead, function (lookAheadSymbol) { return lookAheadSymbol.name === lookAheadSelected.name;});
					});

					if (isLookAheadSymbolInOtherLookAheadSet)
					{
						isTheConflictResolvableWithResolvers = k.utils.obj.find(reduceReduceResolvers, function (resolver)
						{
							return resolver.resolve(options.automata, state, reduceItemSelected, reduceItemInspected);
						});

						return !isTheConflictResolvableWithResolvers;
					}

					return false;
				});

				if (!isReduceItemInConflict || ignoreErrors)
				{
					result.reduceItems.push(reduceItemSelected);
					return false;
				}
				return true;
			});

			if (isAnyReduceReduceConflict)
			{
				return false;
			}
		}

		return result;
	};

	return automataLALR1Generator;
})(k.parser.AutomataLRGeneratorBase);


/* Enum that describe valid types of conflict resolvers
* @readonly
* @enum {String}
*/
var conflictResolverType = k.parser.conflictResolverType = {
	STATE_SHIFTREDUCE: 'STATE_SHIFTREDUCE',
	STATE_REDUCEREDUCE: 'STATE_REDUCEREDUCE'
};

/* State Conflict Resolver
* @class
* @classdesc This class is responsible for resolver conflicts at state level, for example Shift/Reduce conflicts */
var ConflictResolver = k.parser.ConflictResolver = (function () {
	'use strict';
	/*
	* Initialize a new Conflict Resolver
	*
	* @constructor
	* @param {String} options.name Uique name of the resolver.
	* @param {conflictResolverType} options.type Indicate the kind of conflict that the current resolver can handle. Default: STATE_SHIFTREDUCE
	* @param {Integer} options.order Numeric values used to sort the resolver and in this way take precendence at the moment of resolve a problem.
		Resolvers will be sorted from lowest values to highest. Default: 9999
	* @param {Function} options.resolveFnc function evalutad at the time of resolve a conflict. Default: Just return false
	*/
	var conflictResolver = function (options)
	{
		this.options = options || {};

		k.utils.obj.defineProperty(this, 'name');
		k.utils.obj.defineProperty(this, 'type');
		k.utils.obj.defineProperty(this, 'order');
		k.utils.obj.defineProperty(this, 'resolveFnc');

		this.type = this.type || conflictResolverType.STATE_SHIFTREDUCE;
		this.order = this.order || 9999;
	};

	/* @method Resolve a conflict
	* This method main idea is that sub-clases override it and implement the real logic. By defaukt it should return false.
	* @param {Automata} automata Automata containing the state tothat is being validated.
	* @param {State} state State that contains the conflict.
	* @param {ItemRule} itemRule1 In case of SHIFT/REDUCE conflict is the SHIFT item rule.
	* @param {ItemRule} itemRule2 In case of SHIFT/REDUCE conflict is the REDUCE item rule.
	* @returns {Object} This meethod will return false in there is not solution for the conflict, otherwise will return an object containing the next properties:
			action: {tableAction} string solution, iteRule: {ItemRule} item rule that should be taken into account*/
	conflictResolver.prototype.resolve = function (automata, state, itemRule1, itemRule2)
	{
		return  k.utils.obj.isFunction(this.resolveFnc) ? this.resolveFnc(automata, state, itemRule1, itemRule2) : false;
	};

	/* @method Generate the default list of resolvers. These are:
		Shift/Reduce Resolver: Precendence
		Shift/Reduce Resolver: Associativity
	* @returns {Array<ConflictResolver>} List of the default (wide-app) Conflict Resolvers. */
	conflictResolver.getDefaultResolvers = function ()
	{
		return [
				new ConflictResolver({
					name: 'precedence_resolver',
					type: conflictResolverType.STATE_SHIFTREDUCE,
					order: 10,
					resolveFnc: function (automata, state, shiftItemRule, reduceItemRule)
					{
						if (!k.utils.obj.isNumber(shiftItemRule.rule.precendence) && !k.utils.obj.isNumber(reduceItemRule.rule.precendence))
						{
							//If neither of the rules define precedence, we can resolve the conflict
							return false;
						}

						shiftItemRule.rule.precendence =  k.utils.obj.isNumber(shiftItemRule.rule.precendence) ? shiftItemRule.rule.precendence : 0;
						reduceItemRule.rule.precendence =  k.utils.obj.isNumber(reduceItemRule.rule.precendence) ? reduceItemRule.rule.precendence : 0;

						if (shiftItemRule.rule.precendence > reduceItemRule.rule.precendence)
						{
							return {
								itemRule: shiftItemRule,
								action: k.parser.tableAction.SHIFT
							};
						}
						else if (shiftItemRule.rule.precendence < reduceItemRule.rule.precendence)
						{
							return {
								itemRule: reduceItemRule,
								action: k.parser.tableAction.REDUCE
							};
						}
						return false; // both rules have the same precendence
					}
				}),
				new ConflictResolver({
					name: 'associativity_resolver',
					type: conflictResolverType.STATE_SHIFTREDUCE,
					order: 20,
					resolveFnc: function (automata, state, shiftItemRule, reduceItemRule)
					{
						var shiftSymbol = shiftItemRule.getCurrentSymbol();
						if (shiftSymbol.assoc === k.data.associativity.RIGHT)
						{
							return {
								action: k.parser.tableAction.SHIFT,
								itemRule: shiftItemRule
							};
						}
						else if (shiftSymbol.assoc === k.data.associativity.LEFT)
						{
							return {
								action: k.parser.tableAction.REDUCE,
								itemRule: reduceItemRule
							};
						}

						return false;
					}
				})
			];
	};

	return conflictResolver;
})();

/*Enum for error types reported by the parser
* @readonly
* @enum {String}
*/
var parserErrorType = k.parser.errorType = {
	//When the lexer returns error,
	LEXER_NOTOKEN: 'LEXER_NOTOKEN',
	//When the lookAhead does not allow any valid action (Action table error)
	PARSER_NOCONTINUATION: 'PARSE_NOCONTINUATION',
	//When from the current state there is not valid next state (GoTo tabe error)
	PARSER_NOMOVEMENT: 'PARSER_NOMOVEMENT'
};

/* Parser
* @class
* @classdesc Parser engine reponsible for parse an entire string */
var Parser = k.parser.Parser = (function() {
	'use strict';
	/*
	* Creates an instance of a Parser
	*
	* @constructor
	* @param {Object} options.gotoTable The GOTO Table of the current grammar
	* @param {Function} options.actionTable Action table used to control the parsing process
	* @param {State} options.initialState Initial state of the automata the describe the current grammar
	*/
	var parser = function (options)
	{
		this.options = options;

		k.utils.obj.defineProperty(this, 'gotoTable');
		k.utils.obj.defineProperty(this, 'actionTable');
		k.utils.obj.defineProperty(this, 'initialState');

		k.utils.obj.defineProperty(this, 'actionTableFn');
		k.utils.obj.defineProperty(this, 'stack');
		k.utils.obj.defineProperty(this, 'currentToken');

		if (!this.gotoTable) {
			throw new Error('Invalid initialization values for a Parser, please provide a GOTO Table');
		}

		if (!this.actionTable)
		{
			throw new Error('Invalid initialization values for a Parser, please provide a Action Table');
		}
		else
		{
			this.actionTableFn = this._getActionTableFunction(this.actionTable);
		}

		if (!this.initialState) {
			throw new Error('Invalid initialization values for a Parser, please provide a Initial State');
		}

		this.stack = this.stack || [];
	};

	parser.prototype._getActionTableFunction = function (table)
	{
		return (function (actionTable)
		{
			return function (currentStateId, look_ahead)
			{
				return (actionTable[currentStateId] && look_ahead && look_ahead.name && actionTable[currentStateId][look_ahead.name] ) ||
					{
						action: k.parser.tableAction.ERROR
					};

			};
		})(table);
	};

	/* @method Parse an input
	* @param {Lexer} lexer The lexer which will lexically analize the input
	* @returns {ASTNode|Error} The generated AST in case of success or an error object otherwise. In the case of an ASTNode see the class ASTNoode, in case of error de format is:
	* {Boolean} error.error Indicate the result is an error
	* {Enum<k.parser.errorType>} error.type Type of occurred error
	* {String} error.description A general description of the error (Just in english, no localization provided)
	* {Number} error.character Character position where the last token was found
	* {Number} error.line Line position where the last token was found
	* {Object} error.extra Dependeing on the kind of error some extra information ce be provided */
	parser.prototype.parse = function (lexer) {
		//TODO TEST THIS!!!

		var initialStackItem = new k.data.StackItem({
				state: this.initialState
			});

		// this.currentToken = lexer.getNext();
		this.currentToken = lexer.getNext(this._getExpectedLookAhead(this.initialState.getIdentity()));

		if (this.currentToken.error)
		{
			return {
				error: true,
				type: k.parser.errorType.LEXER_NOTOKEN,
				description: 'Invalid string to token. There were no valid next token',
				line: this.currentToken.line,
				character: this.currentToken.character,
				extra: this.currentToken
			};
		}
		this.stack.push(initialStackItem);

		return this._parse(lexer);
	};

	/* @method Internal method to Parse an input. This method will loop through input analizyng the Goto and Action tables
	* @param {Lexer} lexer The lexer which will lexically analize the input
	* @returns {ASTNode|Error} The generated AST in case of success or an error object otherwise */
	parser.prototype._parse = function (lexer) {
		var stateToGo,
			actionToDo,
			lastItem = this.stack[this.stack.length-1];

		/*
		Basic Functionality:
		Create an state, ask for an action todo based on the symbol lookAhead an the current state
			if SHIFT, as we have already created the state we just update our current state
			if ERROR, finish execution
			if REDUCE shrink the stack, apply reduce function and update the stack based on the reduce rule
		When the current state is updated ask for goto action and create the new stack item based on this answer.
		*/

		do {
			//Action
			actionToDo = this.actionTableFn(lastItem.state.getIdentity(), this.currentToken.terminal);

			if (actionToDo.action === k.parser.tableAction.ERROR)
			{
				return {
					error: true,
					type: k.parser.errorType.PARSER_NOCONTINUATION,
					description: 'Invalid lookAhead. The current state does not allow the current lookAhead',
					line: this.currentToken.line,
					character: this.currentToken.character,
					extra: {
						terminal: this.currentToken.terminal,
						string: this.currentToken.string,
						validLookAhead: this._getExpectedLookAhead(lastItem.state.getIdentity())
					}
				};
			}
			else if (actionToDo.action === k.parser.tableAction.SHIFT)
			{
				lastItem.symbol = this.currentToken.terminal;
				lastItem.currentValue = this.currentToken.string;
				lastItem.stringValue = this.currentToken.string;

				lastItem.ignoredString = this.currentToken.ignoredString;
				// this.currentToken = lexer.getNext();

				// if (this.currentToken.error)
				// {
				// 	return {
				// 		error: true,
				// 		type: k.parser.errorType.LEXER_NOTOKEN,
				// 		description: 'Invalid string to token. There were no valid next token',
				// 		line: this.currentToken.line,
				// 		character: this.currentToken.character,
				// 		extra: this.currentToken
				// 	};
				// }

			}
			else if (actionToDo.action === k.parser.tableAction.REDUCE)
			{
				lastItem = this._reduce(actionToDo);
			}
			else if (actionToDo.action === k.parser.tableAction.ACCEPT)
			{
				lastItem = this._reduce(actionToDo);
				//As we extend the grammar adding a extra rule S' => S #, the last stack item has two children and the first one is the expeted result
				return lastItem.AST.nodes[0];
			}


			//Goto
			stateToGo = this.gotoTable[lastItem.state.getIdentity()][lastItem.symbol];
			if (!stateToGo)
			{
				//The input string is not valid!, there are not valid movement in the goto table
				return {
					error: true,
					type: k.parser.errorType.PARSER_NOMOVEMENT,
					description: 'Invalid state to go. The is no valid next state',
					line: this.currentToken.line,
					character: this.currentToken.character,
					extra: {
						lastState: lastItem.state.getIdentity(),
						lastSymbol: lastItem.symbol
					}
				};
			}

			this.stack.push(new k.data.StackItem({
				state: stateToGo
			}));

			lastItem = this.stack[this.stack.length-1];

			//Read next token
			if (actionToDo.action === k.parser.tableAction.SHIFT)
			{
				this.currentToken = lexer.getNext(this._getExpectedLookAhead(lastItem.state.getIdentity()));

				if (this.currentToken.error)
				{
					return {
						error: true,
						type: k.parser.errorType.LEXER_NOTOKEN,
						description: 'Invalid string to token. There is no valid next token',
						line: this.currentToken.line,
						character: this.currentToken.character,
						extra: this.currentToken
					};
				}
			}

		} while(true);
	};

	/* @method Internal method to return the list of valid token given certain state id. This is used to report errors when the look Ahead is not valid.
	* @param {String} state_id Id the of state (row of the action table) to consult to
	* @returns {Array<String>} List of valid look Ahead names, in this case terminal token names  */
	parser.prototype._getExpectedLookAhead = function (state_id)
	{
		return k.utils.obj.keys(this.actionTable[state_id]);
	};

	/* @method Internal method to apply a reduce action.
	* @param {Rule} actionToDo.rule The by which the reduce aciton will take place
	* @returns {Object} The last item in the stack already updated */
	parser.prototype._reduce = function (actionToDo)
	{
		var reduceFunctionParameters = {},
			newASTNode,
			subASTNodes,
			stackRange,
			rule = actionToDo.rule,
			isEMPTYRule = rule.tail.length === 1 && rule.tail[0].name === k.data.specialSymbol.EMPTY,
			lastItem = this.stack[this.stack.length - 1];

		stackRange = isEMPTYRule ?
						//If the reduce rule is the empty one, there is no values to collect
						[] :
						// Get the last n (rule length) elements of the stack ignoring the last one, which is just there for the previous GoTo Action.
						this.stack.slice(-1 * (rule.tail.length + 1), this.stack.length - 1);
		reduceFunctionParameters.values = k.utils.obj.map(stackRange, function (stackItem)
		{
			return stackItem.currentValue || stackItem.symbol;
		});
		reduceFunctionParameters.ignoredStrings = k.utils.obj.map(stackRange, function (stackItem)
		{
			return stackItem.ignoredString;
		});
		reduceFunctionParameters.stackRange = stackRange;
		reduceFunctionParameters.rule = rule;

		//Shrink stack based on the reduce rule
		this.stack = isEMPTYRule ?
						//Based on the Basic Functionality the last stack item used by the empty rule is already there and no item is require to be removed
						this.stack :
						this.stack.slice(0, -1 * rule.tail.length);
		//Update last stack item
		lastItem = this.stack[this.stack.length - 1];
		lastItem.symbol = rule.head;
		lastItem.currentValue = k.utils.obj.isFunction(rule.reduceFunc) ? (rule.reduceFunc.call(this, reduceFunctionParameters) || lastItem.symbol) : lastItem.symbol;


		// Update/Generate AST
		subASTNodes = k.utils.obj.map(stackRange, function (stackItem)
		{
			return stackItem.AST || stackItem.stringValue;
		});

		newASTNode = new k.data.ASTNode({
			nodes: subASTNodes,
			rule: rule,
			symbol: rule.head,
			stringValue: lastItem.stringValue,
			currentValue: lastItem.currentValue
		});
		lastItem.AST = newASTNode;

		return lastItem;
	};

	return parser;
})();


/* Parser Creator
* @class
* @classdesc Util class to simplify the process of creating a parser */
var parserCreator = k.parser.parserCreator = (function () {
	'use strict';
	/*
	* Creates an instance of a Parser  Creator. Generally this is not necessary, owing to this class has all its method statics
	*
	* @constructor
	*/
	var creator =  function()
	{
	};

	/* @method Helper method to instanciate a new parser and a lexer
	* @param {Grammar} options.grammar The grammar used to generate the parser
	* @param {AutomataLRGeneratorBase} options.automataGenerator Optional class used to generate the automata. If not specified LR0 will be used
	* @param {String} options.strInput Optional String to be processed
	* @returns {Object} An object with two properties, parser and lexer.
	* {Parser} result.parser Parser instance
	* {Lexer} result.lexer Lexer instance */
	creator.create = function (options)
	{
		options = k.utils.obj.extend({}, {
			automataGenerator: k.parser.AutomataLALR1Generator
		}, options || {});

		var	grammar = options.grammar,
			automataGenerator = new options.automataGenerator({
				grammar: grammar
			}),
			automata = automataGenerator.generateAutomata({conflictResolvers: k.parser.ConflictResolver.getDefaultResolvers()}),
			gotoTable = automataGenerator.generateGOTOTable(automata),
			actionTable = automataGenerator.generateACTIONTable(automata, {
				conflictResolvers: k.parser.ConflictResolver.getDefaultResolvers(),
				ignoreErrors: false
			}),
			lexer = new k.lexer.Lexer({
				grammar: grammar,
				stream: options.strInput,
				usePriorities: options.lexer && options.lexer.usePriorities,
				useMultipleMatching: options.lexer && options.lexer.useMultipleMatching
			}),
			parser = new k.parser.Parser({
				gotoTable: gotoTable,
				actionTable: actionTable,
				initialState: automata.initialStateAccessor()
			});

		return  {
			parser: parser,
			lexer: lexer
		};
	};

	return creator;
})();

// See __prologue__.js
	return k;
});
//# sourceMappingURL=kappa.js.map