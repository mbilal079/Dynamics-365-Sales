using System;
using System.Collections.Generic;
using System.IdentityModel.Metadata;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Sample_Plugin
{
    public class Class1 : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the execution context from the service provider. 
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));
            // Obtain tracing service for trace logs
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            // Obtain the organization service reference which you will need for  
            // web service calls.
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)
                serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            if (context.InputParameters.Contains("Target") & context.InputParameters["Target"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                //EntityReference entity = (EntityReference)context.InputParameters["Target"];
                Entity preImage = new Entity ();

                if (entity.LogicalName == "contact")
                {
                    try
                    {
                        if (context.PreEntityImages.Contains("PreImage"))
                        {
                            preImage = context.PreEntityImages["PreImage"];
                        }
                        if (!entity.Attributes.Contains("parentcontactid") && !preImage.Attributes.Contains("parentcontactid"))
                        {
                            return;
                        }

                        // Get job applicants
                        GetJobApplicants(entity, service, tracingService);

                        EntityReference parentAccount = (EntityReference)entity.Attributes["parentcontactid"];
                        if (parentAccount == null) return;

                        // Get parent account of contact
                        Entity account = service.Retrieve(parentAccount.LogicalName, parentAccount.Id, new ColumnSet("statecode"));

                        // Get attributes from contact
                        string fname = string.Empty;
                        if (entity.Attributes.Contains("firstname"))
                        {
                            fname = (string)entity.Attributes["firstname"];
                        }
                    }
                    catch(Exception ex) {
                        throw new InvalidPluginExecutionException(ex.Message);
                    }    
                }
            }
        }
        public static void GetJobApplicants(Entity entity, IOrganizationService service, ITracingService tracingService) 
        {
            string name = string.Empty;
            QueryExpression query = new QueryExpression("mb_jobapplicant");
            query.ColumnSet.AddColumns("name", "mb_email");
            query.Criteria.AddCondition("city", ConditionOperator.Equal, "Seattle");

            EntityCollection applicantCol = service.RetrieveMultiple(query);
            foreach (Entity applicant in applicantCol.Entities) 
            {
                name = (string)applicant.Attributes["name"];
            }
        }


    }
}
