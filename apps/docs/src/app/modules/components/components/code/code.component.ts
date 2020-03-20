import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import * as prismjs from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-bash';

@Component({
  selector: 'ngrc-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements AfterViewInit {
  @Input() language = '';

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const html = this.elementRef.nativeElement.innerHTML as string;
    const removedFirstLine = html.substr(1, html.length - 1);

    if (prismjs.languages[this.language]) {
      const highlighted = prismjs.highlight(removedFirstLine, prismjs.languages[this.language], this.language);
      this.elementRef.nativeElement.innerHTML = `<pre><code>${highlighted}</code></pre>`;
    } else {
      this.elementRef.nativeElement.innerHTML = `<pre><code>${removedFirstLine}</code></pre>`;
    }
  }

}
