// WordScramble.js
import React, { useState, useEffect,useCallback } from 'react';
import '../styles/WordScramble.css';
// import Confetti from 'react-confetti';

// Word list with clues
const wordList = [
  { word: 'CLIMAX', clue: 'The point of highest tension or drama in a narrative' },
  { word: 'FLASHBACK', clue: 'A scene that returns to events that occurred before the main story' },
  { word: 'RESOLUTION', clue: 'The part of a story where conflicts are resolved' },
  { word: 'RISING', clue: 'The building of tension or action leading to the climax' },
  { word: 'PROLOGUE', clue: 'An introduction that sets the stage for the main story' },
  { word: 'SONNET', clue: 'A 14-line poem with a specific rhyme scheme' },
  { word: 'STANZA', clue: 'A grouped set of lines within a poem' },
  { word: 'RHYME', clue: 'When two words end with the same sound' },
  { word: 'METER', clue: 'The rhythmic pattern of stressed and unstressed syllables' },
  { word: 'HAIKU', clue: 'A three-line Japanese poem with a 5-7-5 syllable pattern' },
  { word: 'FIRST', clue: 'A narrative perspective using "I" or "we"' },
  { word: 'THIRD', clue: 'A narrative perspective using "he," "she," or "they"' },
  { word: 'OMNISCIENT', clue: 'A narrator who knows everything about all characters' },
  { word: 'LIMITED', clue: 'A narrative that only shows one character\'s thoughts' },
  { word: 'UNRELIABLE', clue: 'A narrator whose credibility is compromised' },
  { word: 'MELODY', clue: 'The main musical line that you might sing or hum' },
  { word: 'RHYTHM', clue: 'The pattern of sounds and silences in music' },
  { word: 'TEMPO', clue: 'The speed at which music is played' },
  { word: 'HARMONY', clue: 'When different notes are played together to create chords' },
  { word: 'CHORUS', clue: 'A repeated section of a song often containing its main message' },
  { word: 'SCENE', clue: 'A section of a film taking place in a single location' },
  { word: 'MONTAGE', clue: 'A series of short shots edited together to condense time' },
  { word: 'ZOOM', clue: 'A camera technique that moves closer to or farther from the subject' },
  { word: 'SCRIPT', clue: 'The written text of a film including dialogue and directions' },
  { word: 'CAMEO', clue: 'A brief appearance by a well-known person in a film' },
  { word: 'STAGE', clue: 'The area where theatrical performances take place' },
  { word: 'PROP', clue: 'An object used by actors during a performance' },
  { word: 'MONOLOGUE', clue: 'A long speech by one character in a play' },
  { word: 'COSTUME', clue: 'Clothing worn by actors to represent their characters' },
  { word: 'CURTAIN', clue: 'The large cloth that separates the stage from the audience' },
  { word: 'CANVAS', clue: 'The fabric surface that painters often work on' },
  { word: 'SKETCH', clue: 'A rough or unfinished drawing' },
  { word: 'PALETTE', clue: 'A surface used to mix colors while painting' },
  { word: 'COLLAGE', clue: 'Artwork made by attaching various materials to a surface' },
  { word: 'MURAL', clue: 'A large picture painted directly on a wall or ceiling' },
  { word: 'DRAGON', clue: 'A large, fire-breathing mythical creature' },
  { word: 'WIZARD', clue: 'A person who can use magic or supernatural powers' },
  { word: 'QUEST', clue: 'A long journey in search of something important' },
  { word: 'SPELL', clue: 'A magical formula intended to create a specific effect' },
  { word: 'ELF', clue: 'A mythical being typically depicted with pointed ears' },
  { word: 'ROBOT', clue: 'A machine resembling a human being' },
  { word: 'ALIEN', clue: 'A being from another world' },
  { word: 'SPACESHIP', clue: 'A vehicle designed for travel in outer space' },
  { word: 'CLONE', clue: 'An exact copy of a living organism' },
  { word: 'PLANET', clue: 'A large celestial body that orbits a star' },
  { word: 'CLUE', clue: 'Something that helps solve a crime or mystery' },
  { word: 'SUSPECT', clue: 'A person thought to be guilty of a crime' },
  { word: 'DETECTIVE', clue: 'A person who investigates crimes or mysteries' },
  { word: 'ALIBI', clue: 'Evidence that someone was elsewhere when a crime occurred' },
  { word: 'WITNESS', clue: 'A person who sees an event, typically a crime' },
  { word: 'GHOST', clue: 'The spirit of a dead person that appears to the living' },
  { word: 'VAMPIRE', clue: 'A mythical being that feeds on blood' },
  { word: 'ZOMBIE', clue: 'A reanimated corpse that feeds on human flesh' },
  { word: 'CURSE', clue: 'A spell that brings bad luck or misfortune' },
  { word: 'HAUNTED', clue: 'A place frequented by ghosts or spirits' },
  { word: 'LOVE', clue: 'A strong feeling of affection for another person' },
  { word: 'DATE', clue: 'A romantic appointment or outing' },
  { word: 'KISS', clue: 'To touch with the lips as a sign of affection' },
  { word: 'WEDDING', clue: 'A ceremony where two people get married' },
  { word: 'COUPLE', clue: 'Two people in a romantic relationship' },
  { word: 'JOURNEY', clue: 'A long trip or voyage' },
  { word: 'TREASURE', clue: 'A collection of valuable items' },
  { word: 'MAP', clue: 'A diagram showing the features of an area' },
  { word: 'DANGER', clue: 'The possibility of harm or injury' },
  { word: 'EXPLORE', clue: 'To travel through an unfamiliar area to learn about it' },
  { word: 'JOKE', clue: 'Something said or done to provoke laughter' },
  { word: 'PUNCHLINE', clue: 'The final part of a joke that makes it funny' },
  { word: 'SLAPSTICK', clue: 'Physical comedy involving exaggerated actions' },
  { word: 'PARODY', clue: 'A humorous imitation of something serious' },
  { word: 'SITCOM', clue: 'A television comedy series with the same characters' },
  { word: 'TRAGEDY', clue: 'A play dealing with serious subjects ending in disaster' },
  { word: 'EMOTION', clue: 'A strong feeling such as joy or fear' },
  { word: 'CRISIS', clue: 'A time of intense difficulty or danger' },
  { word: 'TEARS', clue: 'Drops of liquid that come from eyes when crying' },
  { word: 'DILEMMA', clue: 'A difficult situation requiring a choice between options' },
  { word: 'COVER', clue: 'The outer part of a book that protects the pages' },
  { word: 'CHAPTER', clue: 'A main division of a book' },
  { word: 'INDEX', clue: 'An alphabetical list of names and topics in a book' },
  { word: 'PREFACE', clue: 'An introduction to a book written by its author' },
  { word: 'SPINE', clue: 'The bound edge of a book where the title is typically printed' },
{ word: 'REACT', clue: 'A JavaScript library for building user interfaces' },
{ word: 'CODING', clue: 'The process of creating computer software' },
{ word: 'PUZZLE', clue: 'A game that tests ingenuity or knowledge' },
{ word: 'ALGORITHM', clue: 'A step-by-step procedure for calculations' },
{ word: 'JAVASCRIPT', clue: 'A programming language commonly used for web development' },
{ word: 'DEVELOPER', clue: 'A person who builds and creates software and applications' },
{ word: 'COMPUTER', clue: 'An electronic device for storing and processing data' },
{ word: 'VARIABLE', clue: 'A storage location paired with an associated name' },
{ word: 'FUNCTION', clue: 'A block of organized, reusable code' },
{ word: 'KEYBOARD', clue: 'A device used to input text into a computer' },
{ word: 'DATABASE', clue: 'An organized collection of data' },
{ word: 'INTERFACE', clue: 'A point where two systems meet and interact' },
{ word: 'PROGRAM', clue: 'A set of instructions that a computer follows' },
{ word: 'SOFTWARE', clue: 'The programs and other operating information used by a computer' },
{ word: 'INTERNET', clue: 'A global computer network' },
{ word: 'PYTHON', clue: 'A high-level programming language known for readability' },
{ word: 'BINARY', clue: 'A number system that uses only 0 and 1' },
{ word: 'SERVER', clue: 'A computer that provides data to other computers' },
{ word: 'NETWORK', clue: 'A collection of interconnected computers and devices' },
{ word: 'WEBSITE', clue: 'A collection of web pages accessible via the internet' },
{ word: 'BROWSER', clue: 'Software used to access information on the World Wide Web' },
{ word: 'SYNTAX', clue: 'Rules that define the structure of a programming language' },
{ word: 'DEBUG', clue: 'To find and fix errors in computer code' },
{ word: 'HARDWARE', clue: 'Physical components of a computer system' },
{ word: 'COMPILER', clue: 'A program that translates code into machine language' },
{ word: 'CLOUD', clue: 'A network of remote servers for storing and processing data' },
{ word: 'ENCRYPT', clue: 'To convert information into a code to prevent unauthorized access' },
{ word: 'FIREWALL', clue: 'A security system that monitors network traffic' },
{ word: 'STORAGE', clue: 'The retention of computer data' },
{ word: 'ARCHIVE', clue: 'A collection of historical records or information' },
{ word: 'BOOLEAN', clue: 'A data type with two possible values: true or false' },
{ word: 'CACHE', clue: 'A temporary storage area for frequently accessed data' },
{ word: 'DOMAIN', clue: 'The address of a website' },
{ word: 'FRAMEWORK', clue: 'A platform for developing software applications' },
{ word: 'GITHUB', clue: 'A platform for hosting and reviewing code' },
{ word: 'HASHTAG', clue: 'A symbol used to identify messages on specific topics' },
{ word: 'ITERATION', clue: 'The repetition of a process in programming' },
{ word: 'KERNEL', clue: 'The central component of an operating system' },
{ word: 'LOCALHOST', clue: 'A hostname that refers to the current computer' },
{ word: 'METHOD', clue: 'A procedure associated with an object in object-oriented programming' },
{ word: 'OPENSOURCE', clue: 'Software whose source code is freely available' },
{ word: 'PIXEL', clue: 'The smallest unit of a digital image' },
{ word: 'QUERY', clue: 'A request for data from a database' },
{ word: 'RUNTIME', clue: 'The period during which a program is executing' },
{ word: 'TEMPLATE', clue: 'A pre-designed format for documents or files' },
{ word: 'USERNAME', clue: 'An identification used by a person to access a system' },
{ word: 'VIRTUAL', clue: 'Not physically existing but made to appear real' },
{ word: 'WIDGET', clue: 'A small application with limited functionality' },
{ word: 'XML', clue: 'A markup language that defines rules for encoding documents' },
{ word: 'YAML', clue: 'A human-readable data serialization standard' },
{ word: 'ZIP', clue: 'A file format used for data compression and archiving' },
{ word: 'AGILE', clue: 'An iterative approach to software development' },
{ word: 'BACKUP', clue: 'A copy of data created as a safeguard' },
{ word: 'COOKIE', clue: 'A small piece of data stored on a user\'s computer by a website' },
{ word: 'DESKTOP', clue: 'The main screen area of a computer' },
{ word: 'ERROR', clue: 'A mistake in coding or program execution' },
{ word: 'FOLDER', clue: 'A virtual container for storing files' },
{ word: 'GRADLE', clue: 'A build automation tool' },
{ word: 'HACKER', clue: 'Someone who explores methods for breaching computer security' },
{ word: 'INPUT', clue: 'Data provided to a computer program' },
{ word: 'JSON', clue: 'A lightweight data interchange format' },
{ word: 'KEYBOARD', clue: 'A device used to input text into a computer' },
{ word: 'LOOP', clue: 'A sequence of instructions that is continually repeated' },
{ word: 'MOUSE', clue: 'A handheld pointing device for computers' },
{ word: 'NODE', clue: 'A basic unit of a data structure' },
{ word: 'OUTPUT', clue: 'Data produced by a computer program' },
{ word: 'PLUGIN', clue: 'Software component that adds a specific feature to an existing program' },
{ word: 'QUEUE', clue: 'A linear data structure that follows FIFO order' },
{ word: 'ROUTER', clue: 'A device that forwards data packets between computer networks' },
{ word: 'STACK', clue: 'A linear data structure that follows LIFO order' },
{ word: 'TOKEN', clue: 'A basic component of source code identified by a lexer' },
{ word: 'UPDATE', clue: 'To modify software with a newer version' },
{ word: 'VERSION', clue: 'A specific form or variation of something' },
{ word: 'WIFI', clue: 'A wireless networking technology' },
{ word: 'XHTML', clue: 'A markup language that follows XML syntax' },
{ word: 'YARN', clue: 'A package manager for JavaScript' },
{ word: 'ZOOM', clue: 'To enlarge or reduce the view of a document' },
{ word: 'API', clue: 'A set of rules allowing different software to communicate' },
{ word: 'BIT', clue: 'The basic unit of information in computing' },
{ word: 'CSS', clue: 'A style sheet language used for describing document presentation' },
{ word: 'DATA', clue: 'Facts and statistics collected for reference or analysis' },
{ word: 'ECHO', clue: 'A command that outputs the strings it is given as arguments' },
{ word: 'FILE', clue: 'A collection of data stored in a computer' },
{ word: 'GUI', clue: 'A graphical user interface for interacting with electronic devices' },
{ word: 'HTML', clue: 'The standard markup language for creating web pages' },
{ word: 'IDE', clue: 'Software for writing and testing code' },
{ word: 'JAR', clue: 'A package file format for Java applications' },
{ word: 'KEY', clue: 'A unique identifier for records in a database' },
{ word: 'LOG', clue: 'A file recording events that occur in an operating system' },
{ word: 'MACRO', clue: 'A single instruction that expands into a set of instructions' },
{ word: 'NULL', clue: 'A special value representing the absence of a value' },
{ word: 'OOP', clue: 'A programming paradigm based on objects and classes' },
{ word: 'PORT', clue: 'A communication endpoint for data transmission' },
{ word: 'QUERY', clue: 'A request for data or information from a database' },
{ word: 'RAM', clue: 'A type of computer memory that can be accessed randomly' },
{ word: 'SQL', clue: 'A language designed for managing data in databases' },
{ word: 'TAG', clue: 'A markup element in HTML' },
{ word: 'URL', clue: 'The address of a web page' },
{ word: 'VPN', clue: 'A secure connection between devices across the internet' },
{ word: 'WEB', clue: 'A system of interlinked hypertext documents' },
{ word: 'XML', clue: 'A markup language for encoding documents' },
{ word: 'YAML', clue: 'A human-readable data serialization language' },
{ word: 'AJAX', clue: 'A technique for creating interactive web applications' },
{ word: 'BASH', clue: 'A Unix shell and command language' },
{ word: 'CASE', clue: 'The capitalization style of letters in programming' },
{ word: 'DISK', clue: 'A storage device for digital data' },
{ word: 'EDGE', clue: 'A web browser developed by Microsoft' },
{ word: 'FORK', clue: 'To create a copy of a repository' },
{ word: 'GRID', clue: 'A layout structure in CSS' },
{ word: 'HOST', clue: 'A computer that provides services to other computers' },
{ word: 'ICON', clue: 'A small graphical representation of a program or file' },
{ word: 'JAVA', clue: 'A popular object-oriented programming language' },
{ word: 'LINK', clue: 'A reference to data that can be followed by a user' },
{ word: 'MENU', clue: 'A list of options in a graphical user interface' },
{ word: 'NEST', clue: 'To place programming elements inside one another' },
{ word: 'PERL', clue: 'A high-level programming language' },
{ word: 'RUBY', clue: 'A dynamic, object-oriented programming language' },
{ word: 'SWIFT', clue: 'A programming language for iOS and macOS applications' },
{ word: 'THREAD', clue: 'A sequence of instructions within a process' },
{ word: 'UNIX', clue: 'A family of multitasking, multiuser operating systems' },
{ word: 'VIEW', clue: 'A saved query in a database' },
{ word: 'WORM', clue: 'A type of malicious software that replicates itself' },
{ word: 'XSLT', clue: 'A language for transforming XML documents' },
{ word: 'YOTTABYTE', clue: 'A unit of digital information equal to 10^24 bytes' },
{ word: 'ZETTABYTE', clue: 'A unit of digital information equal to 10^21 bytes' },
{ word: 'ARRAY', clue: 'An ordered collection of data elements of the same type' },
{ word: 'BUFFER', clue: 'A temporary storage area for data being transferred' },
{ word: 'CLASS', clue: 'A template for creating objects in programming' },
{ word: 'DOM', clue: 'A programming interface for HTML and XML documents' },
{ word: 'EVENT', clue: 'An action detected by a program that may be handled' },
{ word: 'FLOAT', clue: 'A number with a decimal point' },
{ word: 'GIT', clue: 'A distributed version control system' },
{ word: 'HASH', clue: 'A function that converts data into a fixed-size value' },
{ word: 'INTEGER', clue: 'A whole number without a fractional component' },
{ word: 'JQUERY', clue: 'A JavaScript library designed to simplify HTML DOM manipulation' },
{ word: 'JSON', clue: 'A lightweight data interchange format' },
{ word: 'KEY-VALUE', clue: 'A pair of related data elements separated by a colon' },
{ word: 'LOOP', clue: 'A programming construct that repeats a set of instructions' },
{ word: 'METHOD', clue: 'A function that belongs to a class' },
{ word: 'MODULE', clue: 'A reusable component in programming' },
{ word: 'OBJECT', clue: 'A data structure that contains properties and methods' },
{ word: 'PROPERTY', clue: 'A characteristic of an object' },
{ word: 'REGEXP', clue: 'A pattern that matches a set of characters' },
{ word: 'SCOPE', clue: 'The visibility of variables within a program' },
{ word: 'SET', clue: 'An unordered collection of unique elements' },
{ word: 'STRING', clue: 'A sequence of characters' },
{ word: 'TEMPLATE', clue: 'A placeholder for data in a program' },
{ word: 'UNDEFINED', clue: 'A variable that has been declared but not assigned a value' },
{ word: 'VARIABLE', clue: 'A named storage location in programming' },
{ word: 'WHITESPACE', clue: 'Any character or series of characters that represent horizontal or vertical space' },
{ word: 'XMLHTTP', clue: 'An API for transferring data between a client and server' },
{ word: 'YARN', clue: 'A package manager for JavaScript applications' },
{ word: 'ZINDEX', clue: 'A CSS property that specifies the stack order of elements' },
{ word: 'AGENT', clue: 'A software program that performs tasks on behalf of a user' },
{ word: 'BROWSER', clue: 'A software application for accessing information on the World Wide Web' },
{ word: 'CACHE', clue: 'A hardware or software component that stores data so future requests can be served faster' },
{ word: 'DATABASE', clue: 'An organized collection of structured information' },
{ word: 'ENCRYPTION', clue: 'The process of converting information into a code to prevent unauthorized access' },
{ word: 'FIREWALL', clue: 'A network security system that monitors and controls incoming and outgoing network traffic' },
{ word: 'GITHUB', clue: 'A web-based platform for version control and collaboration' },
{ word: 'HOSTING', clue: 'The service of providing storage space and access for websites' },
{ word: 'CACHING', clue: 'Storing data temporarily for faster access' },
{ word: 'DJANGO', clue: 'A high-level Python web framework' },
{ word: 'ENCRYPTION', clue: 'The process of converting information into a secret code' },
{ word: 'FLUTTER', clue: 'A UI toolkit for building natively compiled applications' },
{ word: 'GATEWAY', clue: 'A node connecting different networks' },
{ word: 'HIBERNATE', clue: 'An object-relational mapping tool for Java' },
{ word: 'IMMUTABLE', clue: 'An object whose state cannot be modified after creation' },
{ word: 'JWT', clue: 'JSON Web Token - a compact, URL-safe means of transferring claims' },
{ word: 'KUBERNETES', clue: 'An open-source system for automating deployment of containers' },
{ word: 'LARAVEL', clue: 'A PHP web application framework' },
{ word: 'MATRIX', clue: 'A two-dimensional array' },
{ word: 'NOSQL', clue: 'A database design approach that doesn\'t use SQL' },
{ word: 'OAUTH', clue: 'An open standard for access delegation' },
{ word: 'PASCAL', clue: 'A procedural programming language' },
{ word: 'QUANTUM', clue: 'Computing that uses quantum-mechanical phenomena' },
{ word: 'REACT', clue: 'A JavaScript library for building user interfaces' },
{ word: 'SCRUM', clue: 'An agile framework for managing work' },
{ word: 'TERRAFORM', clue: 'An infrastructure as code software tool' },
{ word: 'UNICODE', clue: 'A computing industry standard for text encoding' },
{ word: 'VUE', clue: 'A progressive JavaScript framework for building user interfaces' },
{ word: 'WORKFLOW', clue: 'A sequence of tasks that processes a set of data' },
{ word: 'XAML', clue: 'A declarative markup language from Microsoft' },
{ word: 'YIELD', clue: 'A keyword used to pause and resume a function' },
{ word: 'ZLIB', clue: 'A software library used for data compression' },
{ word: 'AGILE', clue: 'A software development methodology focusing on flexibility' },
{ word: 'BUFFER', clue: 'A region of memory used to temporarily store data' },
{ word: 'CASCADE', clue: 'A process that occurs in a sequence' },
{ word: 'DELEGATE', clue: 'A type that references methods' },
{ word: 'ENDPOINT', clue: 'A remote computing device that communicates with a network' },
{ word: 'FACTORY', clue: 'A design pattern for creating objects without specifying the class' },
{ word: 'GRADLE', clue: 'A build automation system' },
{ word: 'HOOKS', clue: 'Functions that let you use state and lifecycle features in React' },
{ word: 'IOSTREAM', clue: 'A C++ standard library for input and output operations' },
{ word: 'JENKINS', clue: 'An open-source automation server' },
{ word: 'KAFKA', clue: 'A distributed event streaming platform' },
{ word: 'LEGACY', clue: 'Outdated computing technology still in use' },
{ word: 'METADATA', clue: 'Data that provides information about other data' },
{ word: 'NAMESPACE', clue: 'A declarative region that provides a scope for identifiers' },
{ word: 'OPERATOR', clue: 'A symbol that represents an action in programming' },
{ word: 'PROTOTYPE', clue: 'An early model built to test a concept' },
{ word: 'QUERY', clue: 'A request for data from a database' },
{ word: 'REACT', clue: 'A JavaScript library for building user interfaces' },
{ word: 'SCALABLE', clue: 'Able to be changed in size or scale' },
{ word: 'TOKEN', clue: 'A string of characters used in authentication' },
{ word: 'UNICODE', clue: 'A computing standard for consistent encoding of characters' },
{ word: 'VIRTUAL', clue: 'Something that exists in computing but not physically' },
{ word: 'WATERFALL', clue: 'A linear sequential software development approach' },
{ word: 'XQUERY', clue: 'A query language designed for XML data' },
{ word: 'YAML', clue: 'A human-readable data serialization language' },
{ word: 'ZEND', clue: 'A PHP framework' },
{ word: 'ANGULAR', clue: 'A TypeScript-based web application framework' },
{ word: 'BOOLEAN', clue: 'A data type with two possible values: true and false' },
{ word: 'CLOUD', clue: 'A model for enabling on-demand network access to computing resources' },
{ word: 'DOCKER', clue: 'A platform for developing and shipping applications in containers' },
{ word: 'EXPRESS', clue: 'A web application framework for Node.js' },
{ word: 'FLUTTER', clue: 'Google\'s UI toolkit for building applications' },
{ word: 'GITHUB', clue: 'A web-based hosting service for version control' },
{ word: 'HOOK', clue: 'A function component that lets you use state in React' },
{ word: 'INTERFACE', clue: 'A shared boundary across which two systems exchange information' },
{ word: 'JQUERY', clue: 'A fast, small, and feature-rich JavaScript library' },
{ word: 'KOTLIN', clue: 'A statically typed programming language for modern applications' },
{ word: 'LOGGING', clue: 'Recording events that occur in software execution' },
{ word: 'MONGODB', clue: 'A document-oriented NoSQL database' },
{ word: 'NODEJS', clue: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
{ word: 'OBSERVER', clue: 'A design pattern where an object maintains a list of dependents' },
{ word: 'PROMISE', clue: 'An object representing eventual completion of an asynchronous operation' },
{ word: 'QUERY', clue: 'A request for information from a database' },
{ word: 'REDUX', clue: 'A predictable state container for JavaScript apps' },
{ word: 'SOCKET', clue: 'An endpoint for sending or receiving data in a network' },
{ word: 'TYPESCRIPT', clue: 'A strict syntactical superset of JavaScript' },
{ word: 'UBUNTU', clue: 'A Linux distribution based on Debian' },
{ word: 'VERSIONING', clue: 'The creation and management of multiple releases of a product' },
{ word: 'WEBPACK', clue: 'A static module bundler for JavaScript applications' },
{ word: 'XPATH', clue: 'A query language for selecting nodes from an XML document' },
{ word: 'YARN', clue: 'A package manager for JavaScript' },
{ word: 'ZOOKEEPER', clue: 'A centralized service for maintaining configuration information' },
{ word: 'ADAPTER', clue: 'A design pattern that allows incompatible interfaces to work together' },
{ word: 'BASH', clue: 'A Unix shell and command language' },
{ word: 'CACHE', clue: 'A hardware or software component that stores data' },
{ word: 'DAEMON', clue: 'A background process in a computer system' },
{ word: 'ETAG', clue: 'A response header used for web cache validation' },
{ word: 'FETCH', clue: 'A modern replacement for XMLHttpRequest' },
{ word: 'GRID', clue: 'A CSS layout method designed for two-dimensional layouts' },
{ word: 'HIBERNATE', clue: 'An object-relational mapping tool for Java' },
{ word: 'ITERATOR', clue: 'An object that enables traversal through a collection' },
{ word: 'JSON', clue: 'A lightweight data-interchange format' },
{ word: 'KAFKA', clue: 'A distributed streaming platform' },
{ word: 'LINUX', clue: 'An open-source operating system' },
{ word: 'MAVEN', clue: 'A build automation tool used primarily for Java projects' },
{ word: 'NPM', clue: 'A package manager for JavaScript' },
{ word: 'OAUTH', clue: 'An open standard for token-based authentication' },
{ word: 'POSTGRES', clue: 'An open-source relational database system' },
{ word: 'QUERY', clue: 'A request for data from a database' },
{ word: 'RESPONSIVE', clue: 'Web design approach that makes pages render well on various devices' },
{ word: 'SASS', clue: 'A preprocessor scripting language that is interpreted into CSS' },
{ word: 'TERMINAL', clue: 'A text-based interface used to interact with a computer' },
{ word: 'UBUNTU', clue: 'A popular Linux distribution' },
{ word: 'VUEX', clue: 'A state management pattern and library for Vue.js applications' },
{ word: 'WEBHOOK', clue: 'A way for apps to provide real-time information to other applications' },
{ word: 'MOLECULE', clue: 'The smallest unit of a chemical compound that retains its composition and properties' },
{ word: 'DEMOCRACY', clue: 'A system of government where power is vested in the people' },
{ word: 'CHROMOSOME', clue: 'A thread-like structure of DNA that carries genetic information' },
{ word: 'MERIDIAN', clue: 'An imaginary line running from the North Pole to the South Pole' },
{ word: 'PHOTOSYNTHESIS', clue: 'The process by which plants convert light energy into chemical energy' },
{ word: 'ALGORITHM', clue: 'A step-by-step procedure for solving a problem or accomplishing a task' },
{ word: 'DATABASE', clue: 'An organized collection of structured data' },
{ word: 'FIREWALL', clue: 'A security system that monitors and controls network traffic' },
{ word: 'ENCRYPTION', clue: 'The process of converting information into a code to prevent unauthorized access' },
{ word: 'BANDWIDTH', clue: 'The maximum rate of data transfer across a network' },
{ word: 'NUCLEUS', clue: 'The central part of an atom that contains protons and neutrons' },
{ word: 'ISOTOPE', clue: 'Variants of a chemical element with the same number of protons but different numbers of neutrons' },
{ word: 'CATALYST', clue: 'A substance that increases the rate of a chemical reaction without itself being consumed' },
{ word: 'POLYMER', clue: 'A large molecule composed of many repeated subunits' },
{ word: 'ENTROPY', clue: 'A measure of disorder or randomness in a system' },
{ word: 'MITOSIS', clue: 'A type of cell division resulting in two identical daughter cells' },
{ word: 'ECOSYSTEM', clue: 'A biological community of interacting organisms and their physical environment' },
{ word: 'VACCINE', clue: 'A substance used to stimulate the production of antibodies to provide immunity against disease' },
{ word: 'NEURON', clue: 'A specialized cell that transmits nerve impulses' },
{ word: 'HOMEOSTASIS', clue: 'The tendency of a system to maintain internal stability' },
{ word: 'INFLATION', clue: 'A general increase in prices and fall in the purchasing value of money' },
{ word: 'RECESSION', clue: 'A period of temporary economic decline during which trade and industrial activity are reduced' },
{ word: 'MONOPOLY', clue: 'Exclusive control of a commodity or service in a particular market' },
{ word: 'DIVERSIFICATION', clue: 'The action of spreading investments among different types of assets' },
{ word: 'DEPRECIATION', clue: 'A reduction in the value of an asset over time' },
{ word: 'ALLEGORY', clue: 'A story, poem, or picture that can be interpreted to reveal a hidden meaning' },
{ word: 'METAPHOR', clue: 'A figure of speech in which a word or phrase is applied to an object or action it does not literally denote' },
{ word: 'SYNTAX', clue: 'The arrangement of words and phrases to create well-formed sentences' },
{ word: 'PROTAGONIST', clue: 'The leading character or one of the major characters in a story' },
{ word: 'SONNET', clue: 'A poem of fourteen lines using any of a number of formal rhyme schemes' },
{ word: 'COVER', clue: 'The outer part of a book that protects the pages' },
{ word: 'CHAPTER', clue: 'A main division of a book' },
{ word: 'INDEX', clue: 'An alphabetical list of names and topics in a book' },
{ word: 'PREFACE', clue: 'An introduction to a book written by its author' },
{ word: 'SPINE', clue: 'The bound edge of a book where the title is typically printed' },
{ word: 'PLOT', clue: 'The sequence of events that make up a story' },
{ word: 'THEME', clue: 'The central idea or message explored in a literary work' },
{ word: 'MOOD', clue: 'The feeling or atmosphere that a work creates for the reader' },
{ word: 'TONE', clue: 'The author\'s attitude toward the subject or audience' },
{ word: 'IRONY', clue: 'When the opposite of what\'s expected occurs or is stated' },
{ word: 'HERO', clue: 'A character admired for brave deeds and noble qualities' },
{ word: 'ANTIHERO', clue: 'A main character who lacks conventional heroic qualities' },
{ word: 'SIDEKICK', clue: 'A close companion who assists the main character' },
{ word: 'MENTOR', clue: 'A wise character who guides and teaches the protagonist' },
{ word: 'FOIL', clue: 'A character who contrasts with another to highlight qualities' },
{ word: 'HORROR', clue: 'A genre meant to frighten, scare, or disgust readers' },
{ word: 'WESTERN', clue: 'Stories set in the American frontier during the late 1800s' },
{ word: 'SATIRE', clue: 'A genre that uses humor to criticize or ridicule' },
{ word: 'FABLE', clue: 'A short story with animals as characters that teaches a moral lesson' },
{ word: 'EPIC', clue: 'A long narrative poem about heroic deeds and events' },

];


// Fisher-Yates shuffle algorithm
const shuffleWord = (word) => {
  const array = word.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  // Ensure the scrambled word is different from the original
  const scrambled = array.join('');
  if (scrambled === word) {
    return shuffleWord(word); // Recursively try again
  }
  
  return scrambled;
};

// Custom confetti component that works without external dependencies
const CustomConfetti = ({ active }) => {
  if (!active) return null;
  
  const confettiCount = 150;
  const confettiColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
  
  const confettiPieces = Array.from({ length: confettiCount }).map((_, i) => {
    const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const left = Math.random() * 100;
    const animationDuration = 3 + Math.random() * 2;
    const size = 5 + Math.random() * 10;
    
    return (
      <div 
        key={i}
        className="confetti-piece"
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: '-20px',
          backgroundColor: randomColor,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          opacity: 0.8,
          animation: `fall ${animationDuration}s linear forwards`,
          animationDelay: `${Math.random() * 0.5}s`,
          transform: `rotate(${Math.random() * 360}deg)`
        }}
      />
    );
  });
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
      {confettiPieces}
    </div>
  );
};

const WordScramble = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState({});
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Background floating bubbles state (from the second file)
  const [bubbles] = useState(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 60,
      animationDuration: `${5 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  });

  // Get a new word based on level
  const getNewWord = useCallback(() => {
    // Filter words based on difficulty (word length increases with level)
    const minLength = Math.min(3 + level, 8); // Increase minimum word length with level
    const levelWords = wordList.filter(wordObj => wordObj.word.length >= minLength);
    
    // If no words match the criteria, use the whole word list
    const filteredList = levelWords.length > 0 ? levelWords : wordList;
    
    // Choose a random word from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    const wordObj = filteredList[randomIndex];
    
    // Ensure the scrambled word is different from the original
    const scrambled = shuffleWord(wordObj.word);
    
    setCurrentWord(wordObj);
    setScrambledWord(scrambled);
    setUserInput('');
    setMessage('');
    setShowAnswer(false);
    setTimeLeft(30); // Reset timer
    setGameActive(true);
  }, [level]);

  // Initialize game
  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  // Timer effect
  useEffect(() => {
    let timer;
    
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setShowAnswer(true);
      setMessage(`Time's up! The word was ${currentWord.word}`);
      
      // Move to next word after 3 seconds
      setTimeout(() => {
        getNewWord();
      }, 3000);
    }
    
    return () => clearInterval(timer);
  }, [timeLeft, gameActive, currentWord.word, getNewWord]);

  // Handle user input
  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase());
  };

  // Check answer
  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord.word) {
      // Calculate score bonus based on time left and level
      const timeBonus = Math.floor(timeLeft / 5);
      const levelBonus = level * 2;
      const totalPoints = 10 + timeBonus + levelBonus;
      
      setScore(score + totalPoints);
      setMessage(`Correct! +${totalPoints} points (Time bonus: +${timeBonus}, Level bonus: +${levelBonus})`);
      setGameActive(false);
      setIsAnimating(true);
      setShowConfetti(true);
      
      // Move to next level after delay
      setTimeout(() => {
        setIsAnimating(false);
        setShowConfetti(false);
        
        // Increase level every 5 correct words
        if ((score + totalPoints) >= level * 50) {
          setLevel(level + 1);
        } else {
          getNewWord();
        }
      }, 3000);
    } else {
      setMessage('Try again!');
    }
  };

  // Provide a hint
  const getHint = () => {
    if (score >= 10) {
      // Give a hint about a random letter position
      const hintIndex = hintsUsed % currentWord.word.length;
      
      // Create a masked version of the word with just the hint letter shown
      let hintWord = Array(currentWord.word.length).fill('_');
      hintWord[hintIndex] = currentWord.word[hintIndex];
      
      const hint = `Hint: The letter at position ${hintIndex + 1} is "${currentWord.word[hintIndex]}"`;
      setScore(score - 10);
      setMessage(hint);
      setHintsUsed(hintsUsed + 1);
    } else {
      setMessage("Not enough points for a hint! You need at least 10 points.");
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameActive) {
      checkAnswer();
    }
  };

  return (
    <div className="word-scramble-container">
      {/* Custom Confetti */}
      <CustomConfetti active={showConfetti} />
      
      {/* Floating background bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            position: 'absolute',
            left: bubble.left,
            top: bubble.top,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: `float ${bubble.animationDuration} ease-in-out infinite`,
            animationDelay: bubble.animationDelay,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <div className="game-panel">
        <h1>🎮Word Scramble</h1>
        
        <div className="stats">
          <div className="stat-box">
            <p>Score: {score}</p>
          </div>
          <div className="stat-box">
            <p>Level: {level}</p>
          </div>
          <div className="stat-box timer">
            <p>Time: {timeLeft}s</p>
            <div 
              className="timer-bar" 
              style={{ width: `${(timeLeft / 30) * 100}%`, backgroundColor: timeLeft < 10 ? '#ff6347' : '#4caf50' }}
            ></div>
          </div>
        </div>
        
        <div className={`word-area ${isAnimating ? 'correct-animation' : ''}`}>
          <h2 className="scrambled-word">{scrambledWord}</h2>
          {showAnswer && (
            <div className="answer-reveal">
              <h3>ANSWER: {currentWord.word}</h3>
            </div>
          )}
        </div>
        
        <div className="clue-box">
          <p><strong>Clue:</strong> {currentWord.clue}</p>
        </div>
        
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer"
            disabled={!gameActive}
            maxLength={currentWord.word?.length || 10}
          />
          <div className="button-group">
            <button 
              className="submit-button" 
              onClick={checkAnswer} 
              disabled={!gameActive}
            >
              Submit
            </button>
            <button 
              className="hint-button" 
              onClick={getHint} 
              disabled={!gameActive || score < 10}
            >
              Hint (-10 pts)
            </button>
          </div>
        </div>
        
        {message && <div className={`message ${message.includes('Correct') ? 'correct-message' : message.includes('Time') ? 'timeout-message' : ''}`}>{message}</div>}
      </div>
    </div>
  );
};

export default WordScramble;