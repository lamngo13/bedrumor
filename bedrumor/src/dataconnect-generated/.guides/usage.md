# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectCreateImage, injectListImages, injectUpdateImage, injectDeleteImage } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly CreateImageOperation = injectCreateImage();
  private readonly ListImagesOperation = injectListImages();
  private readonly UpdateImageOperation = injectUpdateImage(updateImageVars);
  private readonly DeleteImageOperation = injectDeleteImage(deleteImageVars);
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createImage, listImages, updateImage, deleteImage } from '@dataconnect/generated';


// Operation CreateImage: 
const { data } = await CreateImage(dataConnect);

// Operation ListImages: 
const { data } = await ListImages(dataConnect);

// Operation UpdateImage:  For variables, look at type UpdateImageVars in ../index.d.ts
const { data } = await UpdateImage(dataConnect, updateImageVars);

// Operation DeleteImage:  For variables, look at type DeleteImageVars in ../index.d.ts
const { data } = await DeleteImage(dataConnect, deleteImageVars);


```