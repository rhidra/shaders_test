#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash( vec2 p ) {
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float snoise(vec2 p){
  const float K1 = 0.366025404; // (sqrt(3)-1)/2;
  const float K2 = 0.211324865; // (3-sqrt(3))/6;
	vec2  i = floor( p + (p.x+p.y)*K1 );
  vec2  a = p - i + (i.x+i.y)*K2;
  float m = step(a.y,a.x); 
  vec2  o = vec2(m,1.0-m);
  vec2  b = a - o + K2;
	vec2  c = a - 1.0 + 2.0*K2;
  vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
  return dot( n, vec3(70.0) );
}

float fractal_noise(vec2 st) {
  float n = 0.;
  n += 1.5 * snoise(st * .5);
  // n += 1. * snoise(st * 1.);
  n += .5 * snoise(st * 2.);
  // n += .25 * snoise(st * 4.);
  n += .125 * snoise(st * 8.);
  n += .0625 * snoise(st * 16.);
  n += .03125 * snoise(st * 32.);
  n += .015625 * snoise(st * 64.);
  n += .0078125 * snoise(st * 128.);
  n += .00390625 * snoise(st * 256.);
  n += .001953125 * snoise(st * 512.);
  n += .0009765625 * snoise(st * 1024.);
  return n * .5 + .5;
  // return 1. - abs(n);
}

mat2 rotate(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  st -= .5;
  st *= 5. ;
  st.x += -u_time * 1. / 10.;

  float n0 = fractal_noise(st * rotate(2.*PI*.0001*u_time) + vec2(100., 200.) * u_time * .0001);
  float n1 = fractal_noise(st + n0 * .8 + 2.*cos(u_time*.1+5.));
  float n = fractal_noise(st + n1 * .8 + 2.*cos(u_time*.1+1.));
  
  vec3 color = mix(vec3(.408, .737, .0), vec3(1., .69, 0.), cos(n*2.*PI + u_time)*.5+.5);
  color = mix(color, vec3(1., .0, 0.4), n1 * .7 * (cos(u_time*.5) * .5 + .5));
  color *= n;
  // vec3 color = vec3(n);

  gl_FragColor = vec4(color, 1.);
}