<html>
<head>
  <!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div>
@yield('content')
<script src="{{ asset('js/app.js') }}" defer></script>
</div>
</body>
</html>