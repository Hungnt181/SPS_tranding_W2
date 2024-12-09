export type Author = { 
    Email: string;
    LookupId: number;
    LookupValue: string;
 }

export type DepartmentOrganization = {
    LookupId: number;
    LookupValue: string;
}

export type  DataItem = {
    Status: string;
    StatusCode: number;
    DepartmentOrganization: DepartmentOrganization;
    Priority: number;
    ID: string;
    Title: string;
    Created: Date; 
    Author: Author;
  }

  export type DataItemInput = Omit<DataItem, "ID">
  