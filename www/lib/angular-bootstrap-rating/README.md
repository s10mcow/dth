angular-bootstrap-rating
========================
 **Rating With Stars Input - A Lightweight Angular Directive Based on Bootstrap**

This is a really easy and straight-forward directive to work with in Angular.
All it does is give you a star rating functionality.

####Dependencies:
- Angular
- Bootstrap (actually, the only thing I use is glyphicons from bootstrap, so its easy to modifiy for other needs)

####Usage:
Here we go

You can use it dynamically, it has two-way data binding, so its basically like `ng-model`:
```html
<span reevio-rating="myAngularVariable" reevio-rating-length="5"></span>
```
The source is so small, its incredible, three cheers for Angular :)

- `reevio-rating`: sets the value (and gets it via 2-way data binding)
- `reevio-rating-length`: how many symbols do you want to see


####Customization:
You can costumize colors, etc in the css. It's all there


