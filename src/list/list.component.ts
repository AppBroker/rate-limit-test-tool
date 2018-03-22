import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { ExpComponent } from './exp.component';

@Component({
  selector: 'app-list-component',
  template: `<span class="tiny">Add/Remove Headers ( For example - 'Authorization : xxxx' )</span>
              <div #parent></div>
              <div>
                <button type="button" (click)="addComponent()"
                      class="btn btn-default">Add Header </button>
             </div>`
})
export class ListComponent implements OnInit {
  listItems = [];
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private _cfr: ComponentFactoryResolver) { }
  ngOnInit() {
    this.addComponent();
  }

  addComponent() {
    const comp = this._cfr.resolveComponentFactory(ExpComponent);
    const expComponent = this.container.createComponent(comp);
    expComponent.instance._ref = expComponent;
    this.listItems = this.container['_embeddedViews']
      .map( item => { return item.nodes[0].componentView; } )
      .map( obj => { return obj.context; } )
      .filter( item => { if (item.headerName && item.headerValue) { return item; }} );
  }

  getHeaderValues(): Array <any> {
    return this.listItems;
  }
}
